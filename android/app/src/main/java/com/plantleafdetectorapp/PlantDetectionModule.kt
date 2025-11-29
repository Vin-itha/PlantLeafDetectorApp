package com.plantleafdetectorapp

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import androidx.exifinterface.media.ExifInterface
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import org.tensorflow.lite.Interpreter
import org.tensorflow.lite.support.common.FileUtil
import org.tensorflow.lite.support.image.ImageProcessor
import org.tensorflow.lite.support.image.TensorImage
import org.tensorflow.lite.support.image.ops.ResizeOp
import org.tensorflow.lite.support.label.TensorLabel
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer
import java.io.IOException
import java.nio.MappedByteBuffer
import kotlin.math.min

class PlantDetectionModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    
    private val context: ReactApplicationContext = reactContext
    private var interpreter: Interpreter? = null
    private var labels: List<String>? = null
    private val modelInputSize = 224 // Standard model input size
    
    override fun getName(): String {
        return "PlantDetectionModule"
    }
    
    init {
        try {
            loadModel()
            loadLabels()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    
private fun loadModel() {
    try {
        val modelBuffer: MappedByteBuffer = FileUtil.loadMappedFile(context, "plant_detection_model.tflite")
        interpreter = Interpreter(modelBuffer)

        // 🔍 Log input and output shapes
        val inputShape = interpreter!!.getInputTensor(0).shape()
        val outputShape = interpreter!!.getOutputTensor(0).shape()
        android.util.Log.d("PlantDetection", "Input shape: ${inputShape.contentToString()}, Output shape: ${outputShape.contentToString()}")
    } catch (e: IOException) {
        e.printStackTrace()
    }
}

    
    private fun loadLabels() {
        try {
            labels = listOf("bael", "betel", "crown flower")
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    
    @ReactMethod
    fun detectPlant(imagePath: String, promise: Promise) {
        try {
            val bitmap = loadBitmapFromPath(imagePath)
            if (bitmap == null) {
                promise.reject("BITMAP_ERROR", "Failed to load bitmap from path")
                return
            }
            
            val result = runInference(bitmap)
            promise.resolve(result)
            
        } catch (e: Exception) {
            promise.reject("DETECTION_ERROR", e.message)
        }
    }
    
private fun loadBitmapFromPath(imagePath: String): Bitmap? {
    return try {
        val uri = android.net.Uri.parse(imagePath)
        val inputStream = context.contentResolver.openInputStream(uri)
        val bitmap = BitmapFactory.decodeStream(inputStream)
        inputStream?.close()
        rotateImageIfRequired(bitmap!!, imagePath)
    } catch (e: Exception) {
        e.printStackTrace()
        null
    }
}

    
private fun rotateImageIfRequired(img: Bitmap, imagePath: String): Bitmap {
    return try {
        val uri = android.net.Uri.parse(imagePath)
        val inputStream = context.contentResolver.openInputStream(uri)
        val ei = ExifInterface(inputStream!!)
        val orientation = ei.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL)
        inputStream.close()

        when (orientation) {
            ExifInterface.ORIENTATION_ROTATE_90 -> rotateImage(img, 90f)
            ExifInterface.ORIENTATION_ROTATE_180 -> rotateImage(img, 180f)
            ExifInterface.ORIENTATION_ROTATE_270 -> rotateImage(img, 270f)
            else -> img
        }
    } catch (e: Exception) {
        e.printStackTrace()
        img
    }
}

    
    private fun rotateImage(img: Bitmap, degree: Float): Bitmap {
        val matrix = Matrix()
        matrix.postRotate(degree)
        val rotatedImg = Bitmap.createBitmap(img, 0, 0, img.width, img.height, matrix, true)
        img.recycle()
        return rotatedImg
    }
    
private fun runInference(bitmap: Bitmap): WritableMap {
    val result = Arguments.createMap()

    try {
        // Preprocess image
        val resizedBitmap = Bitmap.createScaledBitmap(bitmap, modelInputSize, modelInputSize, true)
val tensorImage = TensorImage(org.tensorflow.lite.DataType.FLOAT32)
tensorImage.load(resizedBitmap)

        val imageProcessor = ImageProcessor.Builder()
            .add(ResizeOp(modelInputSize, modelInputSize, ResizeOp.ResizeMethod.BILINEAR))
            .build()

        val processedImage = imageProcessor.process(tensorImage)

        // 🔑 Get output shape dynamically
        val outputShape = interpreter!!.getOutputTensor(0).shape()
        val outputBuffer = TensorBuffer.createFixedSize(outputShape, org.tensorflow.lite.DataType.FLOAT32)

        // Run inference
        interpreter?.run(processedImage.buffer, outputBuffer.buffer)

        // Read results
        val confidences = outputBuffer.floatArray

        // Example: classification with N labels
        val maxConfidenceIndex = confidences.indices.maxByOrNull { confidences[it] } ?: 0
        val maxConfidence = confidences[maxConfidenceIndex]
        val plantName = labels?.getOrNull(maxConfidenceIndex) ?: "Unknown"

        // Build predictions array
        val predictions = Arguments.createArray()
        labels?.forEachIndexed { index, label ->
            val prediction = Arguments.createMap()
            prediction.putString("label", label)
            prediction.putString("displayName", getDisplayName(label))
            prediction.putDouble("confidence", confidences.getOrNull(index)?.toDouble() ?: 0.0)
            predictions.pushMap(prediction)
        }

        result.putString("detectedPlant", getDisplayName(plantName))
        result.putDouble("confidence", maxConfidence.toDouble())
        result.putInt("predictedIndex", maxConfidenceIndex)
        result.putArray("predictions", predictions)
        result.putBoolean("success", true)

    } catch (e: Exception) {
        result.putBoolean("success", false)
        result.putString("error", e.message)
    }

    return result
}

    
    private fun getDisplayName(label: String): String {
    return when (label) {
        "bael" -> "Bael"
        "betel" -> "Betel"
        "crown flower" -> "Crown Flower"
        else -> label.replaceFirstChar { if (it.isLowerCase()) it.titlecase() else it.toString() }
    }
}

    
    @ReactMethod
    fun isModelLoaded(promise: Promise) {
        promise.resolve(interpreter != null)
    }
    
    @ReactMethod
    fun getModelInfo(promise: Promise) {
        val info = Arguments.createMap()
        info.putBoolean("isLoaded", interpreter != null)
        info.putInt("inputSize", modelInputSize)
        info.putArray("supportedPlants", Arguments.fromJavaArgs(arrayOf("Bael", "Betel", "Crown Flower")))
        
        val accuracyInfo = Arguments.createMap()
        accuracyInfo.putInt("bael", 85)
        accuracyInfo.putInt("betel", 90)
        accuracyInfo.putInt("crownFlower", 90)
        info.putMap("accuracyInfo", accuracyInfo)
        
        promise.resolve(info)
    }
}