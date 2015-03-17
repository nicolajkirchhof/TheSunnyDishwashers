
#include <SPI.h>
// #include <Ethernet.h>

//Configure Ethernet
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
byte ip[] = { 192, 168, 42, 2 };
byte server[] = { 192, 168, 42, 1 }; //local pc
int port = 9913; //tcp port to use for connection to server


// EthernetClient client;

//tcp frame for sending goalcounter events to the server
//the first byte is the command id, the second byte identifies the sensor
byte message[2];

//Interrupt flags
volatile bool interrupt1_occured = 0;  //interrupt flag for interrupt1 (pin2)
volatile bool interrupt2_occured = 0;  //interrupt flag for interrupt2 (pin3)

//pin definitions
#define pin_button_1 5
#define pin_button_2 6
#define pin_led_1 9
#define pin_led_2 8

//command definitions
#define cmd_connect 1
#define cmd_disconnect 2
#define cmd_signal_interrupt1 3
#define cmd_signal_interrupt2 4




int buttonState_1 = 0;
int buttonState_2 = 0;
int timeout_counter = 0;
int interrupt_disable_timeout = 10000;
boolean interrupt_disabled = false;
boolean at_home = false;


void signalGoal(int pin)
{
  //todo: pin unterscheidung einbauen
  Serial.println("TOOOR!!!! (PIN 2)");
  digitalWrite(pin_led_1, HIGH);
  delay(500);
  digitalWrite(pin_led_1, LOW);

  // client.write(cmd_signal_interrupt1);

}



void setup()
{
  //Init serial communication
  Serial.begin(115200);

  //Set pins with leds connected to output
  pinMode(pin_led_1, OUTPUT);
  pinMode(pin_led_2, OUTPUT);
  pinMode(pin_button_1, INPUT);
  pinMode(pin_button_2, INPUT);

  //Switch of both leds
  digitalWrite(pin_led_1, LOW);
  digitalWrite(pin_led_2, LOW);
}
bool at_home_last = false;

void loop()
{
  buttonState_1 = digitalRead(pin_button_1);

  if (buttonState_1 == HIGH) {
    // turn LED on:
    at_home = true;
  }

  buttonState_2 = digitalRead(pin_button_2);

  if (buttonState_2 == HIGH) {
    // turn LED on:
    at_home = false;
  }
  if (at_home != at_home_last)
  {
    if (at_home) {
      Serial.println("true");
      digitalWrite(pin_led_1, HIGH);
    }
    else {
      Serial.println("false");
      digitalWrite(pin_led_1, LOW);
    }
    at_home_last = at_home;
    
  }

}



