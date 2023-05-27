import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { getMessaging, getToken } from "@angular/fire/messaging";
import { environment } from '../environments/environment.development';


@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    currentMessage = new BehaviorSubject<any>(null);

    constructor(private angularFireMessaging: AngularFireMessaging) {
        console.log('messagins service correctly created')
    }

    requestPermission() {
        console.log('Requesting permission...');
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {

                console.log('Notification permission granted.');
                this.getFirebaseToken()
            }
        }).catch((err) => { console.log('error', err) })
    }

    getFirebaseToken() {
        const messaging = getMessaging();
        getToken(messaging, { vapidKey: environment.firebase_token }).then((currentToken: any) => {
            if (currentToken) {
                console.log('Current token', currentToken)
                // Send the token to your server and update the UI if necessary
                // ...
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
        }).catch((err: any) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });

    }



    /*  requestPermission() {
         this.angularFireMessaging.requestToken.subscribe((token: any) => {
             console.log('token', token);
         }), (err: any) => {
             console.log("Unable to get permission to notify.", err);
         }
     } */

    receiveMessaging() {
        this.angularFireMessaging.messages.subscribe((payload) => {
            console.log('new message received', payload)
            this.currentMessage.next(payload)
        })
    }
}