import React, { useState } from 'react'
import { View, Button, Text, StyleSheet } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'

const UploadDocument = ({
  title,
  setSelectedDocument,
  selectedDocument
}) => {

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync()
      const asset = result.assets[0]
      if (result.assets) {
        setSelectedDocument(asset)
      } else {
        console.log('Document pick cancelled')
      }
    } catch (err) {
      console.error('Error picking document:', err)
    }
  }

  return (
    <View style={styles.container}>
      <Button title={title} onPress={pickDocument} />
      {selectedDocument && (
        <View style={styles.documentContainer}>
          <Text style={styles.documentText}>
            {selectedDocument && 
              'Uploaded File: ' + selectedDocument.name.substring(0, 25) + '...'
            }
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  documentText: {
    fontSize: 16,
  },
})

export default UploadDocument
