# Beasy-Interface (Frontend)



Η παραπάνω εφαρμογή είναι το frontend κομμάτι της εφαρμογής Beasy-Inteface. Bασίζεται στη βάση που δημιουργήσαμε στα πλαίσια του μαθήματος των Βάσεων Δεδομένων.

Η εφαρμογή υλοποιεί την λογική που θα χρειαζόταν για την εξυπηρέτηση ενός χρήστη. Συγκεκριμένα:
1. Ο χρήστης μπορεί να κάνει login (χρησιμοποιείται user authentication)
2. Αν ο χρήστης δεν έχει λογαριασμό μπορεί να δημιουργήσει
3. Αφού γίνει το login μπορεί να κλείσει ραντεβού επιλέγοντας την υπηρεσία και την ομάδα που επιθυμεί. Επίσης μπορεί να δεί και τα ραντεβού που έχει ήδη κλείσει.


**Σημείωση**: Οταν ο χρήστης δημιουργήσει λογαριασμό, ή κλείσει ραντεβού τότε αυτά καταχωρούνται αυτόματα στη βάση. Μπορεί κανείς αφού κάνει login να πατήσει `http://localhost:3001/users` και `http://localhost:3001/appointments` και να δει όλους τους χρήστες και τα ραντεβού που υπάρχουν στη βάση. Δεν αποτελεί μέρος της λογικής που θα εξυπηρετούσε έναν απλό χρήστη, καθώς δεν θα έπρεπε να είχε πρόσβαση σε αυτές τις πληροφορίες. Για αυτό και δεν δίνεται πρόσβαση σε αυτά τα endpoints απευθείας από το navigation bar. Θα ταίριαζε περισσότερο σε admin χρήστη ή moderator.

## Πως να τρέξω την εφαρμογή
Αρχικά θα πρέπει να δημιουργήσετε τη βάση ακολουθώντας της οδηγίες που βρίσκονται [εδώ](https://github.com/anapgeo/Beasy-DB) και να κάνετε clone και να τρέξετε στον υπολογιστή σας τον κώδικά του backend ακολουθώντας τις οδηγίες το αντίστοιχου README για την εφαρμογή που βρίσκεται [εδώ](https://github.com/anapgeo/Beasy-Backend)

Μπαίνοντας στο φάκελο του project θα πρέπει να τρέξετε τις παρακάτω εντολές:
1. `npm install` για να εγκατασταθουν τα απαραίτητα dependencies
2. `npm start` για να ξεκινήσει η εφαρμογή

**Σημείωσεις**:
1. Προυπόθεση για να τρέξει ομαλά η εφαρμογή στο browser θα πρέπει να χρησιμοποιήσετε ένα extension όπως [αυτή](https://chromewebstore.google.com/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc)
2. Θα πρέπει πρώτα να τρέξει η backend εφαρμογή και μετά η frontend


