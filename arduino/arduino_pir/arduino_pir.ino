/*******************************************************************************/
/*macro definitions of PIR motion sensor pin and LED pin*/
#define PIR_MOTION_SENSOR 2//Use pin 2 to receive the signal from the module
#define LED	4//the Grove - LED is connected to D4 of Arduino
#define DOOR_EVENT_BUTTON 0

void setup()
{
  pinMode(PIR_MOTION_SENSOR, INPUT);
  attachInterrupt(DOOR_EVENT_BUTTON, doorEvent, RISING);
}

bool isDoorEvent = false;

void loop()
{
  if (isDoorEvent){
    if (isPeopleDetected()){
      Serial.println("true");
    }else{
      Serial.println("false");
    }
    isDoorEvent = false;
  }
}
/***************************************************************/
/*Function: Detect whether anyone moves in it's detecting range*/
/*Return:-boolean, ture is someone detected.*/
const unsigned long DELAY = 5000;
const unsigned long PEOPLE_DETECTED_THESHOLD = 5;

boolean isPeopleDetected()
{
  boolean isDetected = false;
  unsigned long finishesAt = millis() + DELAY;
  unsigned long gatheredDetections = 0;
  while (finishesAt > millis())
  {
    if (digitalRead(PIR_MOTION_SENSOR) == HIGH) {
      gatheredDetections++;
    }
  }
  if(gatheredDetections > PEOPLE_DETECTED_THESHOLD){
    isDetected = true;
  }
  return isDetected;
}

void doorEvent(){
//  Serial.println("DoorEvent");
   isDoorEvent = true;
}
