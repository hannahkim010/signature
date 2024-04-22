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

  const htmlContent = `
  <html>
  <head>
    <style>
      body { 
        font-size: 45px !important; 
        padding: 40px; 
        color: black; 
        font-family: -apple-system, Roboto, sans-serif;
        background-color: white;
      }
      p, li { 
        font-size: 45px;
      }
    </style>
  </head>
    <body>
      <p>I, the purchaser, have exported or loaded the above items onto a licensed carrier for export outside the United States in the presence of the customs broker listed below or have provided the following information and documentation required by law:</p>
      <ul>
        <li>Passport, laser visa identification card or foreign voter registration picture identification indicating foreign residency.</li>
        <li>Purchaser identification number, if issued to me.</li>
        <li>Produced the property and the original receipt for the property.</li>
        <li>The name and address of the place at which the property was purchased.</li>
        <li>The sales price and quantity of the property; description of the property.</li>
        <li>Tax paid on the property; date and time the property was purchased.</li>
        <li>The foreign country destination of the property (must be the foreign country in which the purchaser resides).</li>
        <li>Location where the export will occur; and date and time the property is expected to arrive in the foreign country.</li>
      </ul>
      <p>I understand that tangible personal property not exported is subject to taxation under this chapter, and the purchaser is liable, in addition to other possible civil liabilities and criminal penalties, for payment of an amount equal to the value of the merchandise if the purchaser improperly obtained a refund of taxes.</p>
      <p>I further understand that tangible personal property that has previously been worn or otherwise used in Texas prior to export is also subject to taxation, and the purchaser is liable in the same manner as above.</p>
      <p>I understand that providing false information to a Customs Broker is a Class B misdemeanor.</p>
    </body>
    </html>
  `;


  // if (submitted) {
  //   return (
  //     <View style={styles.submittedContainer}>
  //       <Text style={styles.submittedText}>Signature Done</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Compliance Signature</Text>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        scalesPageToFit={true}
        automaticallyAdjustContentInsets={true}
      />
      <View style={styles.agreementContainer}>
        <TouchableOpacity
          style={[styles.checkbox, agreed && styles.checkedCheckbox]}
          onPress={() => setAgreed(!agreed)}
        >
          {agreed && <Text style={styles.checkmark}>✔️</Text>}
        </TouchableOpacity>
        <Text style={styles.agreementText}>I have read and agree to the Terms and Conditions</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: !agreed ? '#383838' : '#FFF' }]} 
        onPress={handleConfirm}
        disabled={!agreed}
      >
        <Text style={[styles.buttonText, { color: !agreed ? '#606060' : '#000' }]}>CONFIRM
          {/* {agreed ? 'CONFIRM' : 'COMPLETE CHECKBOX'} */}
        </Text>
      </TouchableOpacity>
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
            <TouchableOpacity
              style={[styles.button, { backgroundColor: signatureStarted ? '#FFF' : '#383838' }]}
              onPress={handleSubmit}
              disabled={!signatureStarted}
            >
              <Text style={[styles.buttonText, { color: signatureStarted ? '#000' : '#606060' }]}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: signatureStarted ? '#FFF' : '#383838' }]}
              onPress={handleClear}
              disabled={!signatureStarted}
            >
              <Text style={[styles.buttonText, { color: signatureStarted ? '#000' : '#606060' }]}>CLEAR</Text>
            </TouchableOpacity>
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
    backgroundColor: '#000',
    color: '#FFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 80,
    color: '#000',
    backgroundColor: '#FFF',
    textAlign: 'center',
  },
  webview: {
    height: 550, 
    // marginBottom: 100,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 15,
    borderColor: "#000",
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff', 
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#FFF',
    margin: 10,
  },
  agreementText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFF',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkedCheckbox: {
    backgroundColor: '#fff',
    color: '#FFF',
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
    alignSelf: 'flex-start', 
    padding: 5,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  signatureBox: {
    width: '90%',
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  signatureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
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
