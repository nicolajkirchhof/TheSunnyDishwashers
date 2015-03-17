
// #include <SPI.h>
// #include <WiFi.h>
// //#include <Ethernet.h>

// //Configure Ethernet
// //byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
// //byte ip[] = { 192, 168, 42, 2 };
// //byte server[] = { 192, 168, 42, 1 }; //local pc

// //The ip adress an port of the HMI to connect to
// IPAddress server(192,168,80,56);
// int port = 9913; //tcp port to use for connection to server

// //Configure WiFi
// char ssid[] = "zred"; //  the network SSID (name) 
// char pass[] = "4ziiN9H5T2Ct2EI8gEbpKYoB5Yd0i7jlsYRSKrGRL3ho7BUmQcmSgJt5MDLGNdR";    // the network password (use for WPA, or use as key for WEP)
// int status = WL_IDLE_STATUS;
// boolean alreadyConnected = false; // whether or not the client was connected previously

// WiFiClient client;
// //EthernetClient client;

// //tcp frame for sending goalcounter events to the server
// //the first byte is the command id, the second byte identifies the sensor
// byte message[2];

// //Interrupt flags
// volatile int interrupt1_occured = 0;  //interrupt flag for interrupt1 (pin2)
// volatile int interrupt2_occured = 0;  //interrupt flag for interrupt2 (pin3)

// //pin definitions
// #define pin_button_1 6
// #define pin_button_2 5
// #define pin_led_1 8 
// #define pin_led_2 9

// //command definitions
// #define cmd_connect 1
// #define cmd_disconnect 2
// #define cmd_signal_interrupt1 3
// #define cmd_signal_interrupt2 4




// int buttonState_1 = 0;
// int buttonState_2 = 0;
// int timeout_counter = 0;
// int interrupt_disable_timeout = 2000;
// boolean interrupt_disabled = false;


// void signalGoal(int pin)
// {
//   //todo: pin unterscheidung einbauen
  
//   if(pin == 1)
//   {
//     Serial.println("TOOOR!!!! (PIN 2)");
//    digitalWrite(pin_led_1, HIGH);  
//    delay(500);
//    digitalWrite(pin_led_1, LOW); 
//   }
  
//   if(pin == 2)
//   {
//      Serial.println("TOOOR!!!! (PIN 3)");
//    digitalWrite(pin_led_2, HIGH);  
//    delay(500);
//    digitalWrite(pin_led_2, LOW); 
//   }
//    //Send signal over wifi
//   Serial.print("Trying to connect to tcp server.");
//   if (client.connect(server, port)) 
//    {
//       Serial.print("TCP connected...sending interrupt signal.");
//      client.write(cmd_signal_interrupt1);
//      client.stop();
//    }
// }



// void setup()
// {
//         //Init serial communication
// 	Serial.begin(115200);

//         //attach interrupts 0 and 1 on pins 2 and 3 
// 	attachInterrupt(0, PIN2_ISR, RISING);
//         attachInterrupt(1, PIN3_ISR, RISING); 

//         //Set pins with leds connected to output
//         pinMode(pin_led_1, OUTPUT);
//         pinMode(pin_led_2, OUTPUT);
        
//         //set pins with pushbuttons connected to input
//         pinMode(pin_button_1, INPUT);
//         pinMode(pin_button_2, INPUT);
        
//         //set pin4 to output and HIGH level to disable SD card on wifi shield
//         pinMode(4, OUTPUT);
//         digitalWrite(4, HIGH);
        
//         //Switch of both leds
//         digitalWrite(pin_led_1,LOW);
//         digitalWrite(pin_led_2,LOW);
        
//         // check for the presence of the shield:
//         if (WiFi.status() == WL_NO_SHIELD) 
//         {
//           Serial.println("WiFi shield not present"); 
//           // don't continue:
//           while(true);
//         }
        
//         // attempt to connect to Wifi network:
//         while ( status != WL_CONNECTED) 
//         { 
//           Serial.print("Attempting to connect to SSID: ");
//           Serial.println(ssid);
//           // Connect to WPA/WPA2 network. Change this line if using open or WEP network:    
//           status = WiFi.begin(ssid, pass);

//           // wait 10 seconds for connection:
//           delay(5000);
//         } 
        
//         printWifiStatus();
// }


// void loop()	
// {
//   buttonState_1 = digitalRead(pin_button_1);
  
//   if (buttonState_1 == HIGH) {     
//     // turn LED on:    
//     digitalWrite(pin_led_1, HIGH);  
//   } 
//   else {
//     // turn LED off:
//     digitalWrite(pin_led_1, LOW); 
//   }
  
  
//   buttonState_2 = digitalRead(pin_button_2);
  
//   if (buttonState_2 == HIGH) {     
//     // turn LED on:    
//     digitalWrite(pin_led_2, HIGH);  
//   } 
//   else {
//     // turn LED off:
//     digitalWrite(pin_led_2, LOW); 
//   }
  
  
//   if(interrupt1_occured == 1 && interrupt_disabled == false)
//   {
//     interrupt1_occured = 0;
//     interrupt_disabled = true;
//     signalGoal(1);
//     //Mit Bedienteil kommunizieren
//     //...
    
//   }
  
//    if(interrupt2_occured == 1 && interrupt_disabled == false)
//   {
//     interrupt2_occured = 0;
//     interrupt_disabled = true;
//     signalGoal(2);
//     //Mit Bedienteil kommunizieren
//     //...
    
//   }
  
//   if(interrupt_disabled == true)
//   {
//     if(timeout_counter <= interrupt_disable_timeout)
//     {
//       timeout_counter++;
//     }
//     else
//     {
//       timeout_counter = 0;
//       interrupt_disabled = false;
//       Serial.print("Taking interrupts again.");
//     }
//   }
//   /* add main program code here */
	

// }



// void PIN2_ISR()
// {
//         interrupt1_occured = 1;
	
// }

// void PIN3_ISR()
// {
//         interrupt2_occured = 1;
	
// }


// //For development only, comment out later
// void printWifiStatus() {
//   // print the SSID of the network you're attached to:
//   Serial.print("SSID: ");
//   Serial.println(WiFi.SSID());

//   // print your WiFi shield's IP address:
//   IPAddress ip = WiFi.localIP();
//   Serial.print("IP Address: ");
//   Serial.println(ip);

//   // print the received signal strength:
//   long rssi = WiFi.RSSI();
//   Serial.print("signal strength (RSSI):");
//   Serial.print(rssi);
//   Serial.println(" dBm");
// }
