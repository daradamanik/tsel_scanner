import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  } catch (e) {
    print("Firebase initialization error: $e");
  }
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Firestore Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  // Define the addTestData function here
  Future<void> addTestData() async {
    await FirebaseFirestore.instance.collection('testCollection').add({
      'field1': 'Hello',
      'field2': 'Firestore',
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Firestore Test'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () async {
            await addTestData(); // Call the function when the button is pressed
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text("Data added to Firestore")),
            );
          },
          child: const Text('Add Test Data to Firestore'),
        ),
      ),
    );
  }
}
