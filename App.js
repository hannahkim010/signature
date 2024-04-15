import React, { useState, useRef } from 'react';
import { View, ScrollView, Button, StyleSheet, Text, Alert, TouchableOpacity, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import Signature from 'react-native-signature-canvas';

const App = () => {
  const [signature, setSignature] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureStarted, setSignatureStarted] = useState(false);
  const signatureRef = useRef(null);

  const handleSignature = (signature) => {
    setSignature(signature);
    setSignatureStarted(false);
  };

  const handleSignatureStart = () => {
    setSignatureStarted(true);
  };

  const handleConfirm = () => {
    setShowSignatureModal(true);
  };

  const handleClose = () => {
    handleClear();
    setShowSignatureModal(false);
  };

  const handleSubmit = () => {
    if (signature) {
      setSubmitted(true);
      setShowSignatureModal(false);
    }
    Alert.alert('Alert', 'Signature Submitted', [
      {
      text: 'Ok',
      },
    ]);
    
  };

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clearSignature();
    }
    setSignature(null);
    setSignatureStarted(false);
  }



  // if (submitted) {
  //   return (
  //     <View style={styles.submittedContainer}>
  //       <Text style={styles.submittedText}>Signature Done</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={styles.container}>
      <WebView
        style={styles.pdfViewer}
        source={{ uri: 'https://docs.google.com/document/d/1IzfA4JVlFhV_CHi71kG9r6-nHizRTmZfiITBJS5EAAA/edit?usp=sharing' }}
      />
      <View style={styles.agreementContainer}>
        <TouchableOpacity
          style={[styles.checkbox, agreed && styles.checkedCheckbox]}
          onPress={() => setAgreed(!agreed)}
        >
          {agreed && <Text style={styles.checkmark}>✔️</Text>}
        </TouchableOpacity>
        <Text>I have read and agree to the Terms and Conditions</Text>
      </View>
      <Button title="Confirm" onPress={handleConfirm} disabled={!agreed} />
      <Modal visible={showSignatureModal} transparent={true}>
        <View style={styles.signatureModal}>
          
          <View style={styles.signatureBox}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
            <Text style={styles.signatureTitle}>E-Signature</Text>
            <View style={styles.signatureCanvas}>
              <Signature
                ref={signatureRef}
                onOK={handleSignature}
                onBegin={handleSignatureStart}
                descriptionText=""
                clearText="Clear"
                confirmText="Save"
                webStyle={`
                  .m-signature-pad--footer {display: none; margin: 0px;}
                  .m-signature-pad {box-shadow: none; border: 2px solid black;}
                  .m-signature-pad--body {border: none;}
                `}
              />
            </View>
            <View style={ {flexDirection:"row"} }>
              <Button title="Submit" onPress={handleSubmit} disabled={!signatureStarted} />
              <Button title="Clear" onPress={handleClear} disabled={!signatureStarted} />
            </View>
            
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdfViewer: {
    height: 600, 
    marginBottom: 100,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkedCheckbox: {
    backgroundColor: '#fff',
  },
  checkedIndicator: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
  },
  signatureModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  closeButton: {
    alignSelf: 'flex-start', // Align self allows the button to position itself independently within the parent container
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  signatureBox: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  signatureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signatureCanvas: {
    width: '100%',
    height: 150,
    marginBottom: 15,
    borderBottomWidth: 2,
  },
  submittedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submittedText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;