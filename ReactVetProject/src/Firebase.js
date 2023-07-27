import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app"; // Firebase ana modülünü içe aktarın
import "firebase/compat/firestore"; // Firestore modülünü içe aktarın

import swal from "sweetalert";

// Firebase yapılandırma bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyBrlEB5E0TcSSEwmPS6drnikrLgQH0G_kM",
  authDomain: "vetech-authentication-4ecc4.firebaseapp.com",
  projectId: "vetech-authentication-4ecc4",
  storageBucket: "vetech-authentication-4ecc4.appspot.com",
  messagingSenderId: "1070378572547",
  appId: "1:1070378572547:web:bf7aa93183654a97856736",
  measurementId: "G-9D63NKMGKZ",
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

// Get Auth and Firestore instances
const auth = getAuth();
const firestore = getFirestore();
export { auth, firestore, analytics };



export const registerUser = async (user) => {
  try {
    // Şifre kurallarını kontrol et
    if (user.password.length < 6) {
      swal({
        title: "Error",
        text: "Şifre en az 6 karakter olmalıdır!",
        icon: "error",
        button: "Okay",
      });
      return;
    }

    if (user.email.length < 15) {
      
      swal({
        title: "Error",
        text: "Email en az 15 karakter olmalıdır!",
        icon: "error",
        button: "Okay",
      });
      return;
    }

    if (user.ad.trim() === "") {
      swal({
        title: "Error",
        text: "Ad alanı boş bırakılamaz!",
        icon: "error",
        button: "Okay",
      });
      return;
    }

    if (user.soyad.trim() === "") {
      swal({
        title: "Error",
        text: "Soyad alanı boş bırakılamaz!",
        icon: "error",
        button: "Okay",
      });
      return;
    }

    if (user.isletmeIsmi.trim() === "") {
      swal({
        title: "Error",
        text: "İşletme İsmi alanı boş bırakılamaz!",
        icon: "error",
        button: "Okay",
      });
      return;
    }

    if (user.phoneNumber.trim() === "") {
      swal({
        title: "Error",
        text: "Telefon Numarası alanı boş bırakılamaz!",
        icon: "error",
        button: "Okay",
      });
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    await addDoc(collection(firestore, "users"), {
      ad: user.ad,
      soyad: user.soyad,
      isletmeIsmi: user.isletmeIsmi,
      phoneNumber: user.phoneNumber,
      userId: userCredential.user.uid,
    });

    console.log("Kayıt başarıyla oluşturuldu!");
    swal({
      title: "Başarılı",
      text: "Kaydınız başarıyla oluşturulmuştur!",
      icon: "success",
      buttons: {
        cancel: "Cancel",
        confirm: "Okay",
      },
      closeOnClickOutside: false,
    }).then(function(result) {
      if (result) {
        window.location.href = "/login";
        
      }
    });
  } catch (error) {
    console.error("Kayıt oluşturma hatası:", error);
    swal({
      title: "Error",
      text: "Kaydınız oluşturulamadı, lütfen önceden girilmiş kayıtlı bilgileri girmeyiniz!",
      icon: "error",
      button: "Okay",
    });
  }
};



export const loginUser = async (email, password, navigate) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
};

export const saveUserDataToFirebase = async (userData, userId) => {
  try {
    console.log(userData);
    const userRef = doc(firestore, "users", userId);
    const subCollectionRef = collection(userRef, "user_data");
    await addDoc(subCollectionRef, userData);

    console.log("Kullanıcı verileri başarıyla kaydedildi!");
    swal({
      title: "Başarılı",
      text: "Kullanıcı verileri başarıyla kaydedildi!",
      icon: "success",
      buttons: {
        cancel: "Cancel",
        confirm: "Okay",
      },
      closeOnClickOutside: false,
    });
  } catch (error) {
    console.error("Kullanıcı verileri kaydedilirken bir hata oluştu:", error);
    swal({
      title: "Error",
      text: "Kullanıcı verileri kaydedilirken bir hata oluştu!",
      icon: "error",
      button: "Okay",
    });
  }
};

export const getUserDataFromFirebase = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const userRef = doc(firestore, "users", userId);
      const subCollectionRef = collection(userRef, "user_data");
      const querySnapshot = await getDocs(subCollectionRef);

      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });

      console.log("Kullanıcı verileri başarıyla alındı:", userData);
      return userData;
    } else {
      console.log("Oturum açmış bir kullanıcı bulunamadı.");
      return null;
    }
  } catch (error) {
    console.error("Kullanıcı verileri alınırken bir hata oluştu:", error);
    // Hata durumunda uygun bir hata işleme mekanizması uygulayabilirsiniz
    return null;
  }
};

export const deleteUserDataFromFirebase = async (idd) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userRef = doc(firestore, "users", userId);
      const subCollectionRef = collection(userRef, "user_data");
      const querySnapshot = await getDocs(
        query(subCollectionRef, where("id", "==", idd))
      );
      if (querySnapshot.empty) {
        console.log("Belirtilen veri bulunamadı!");
        return;
      }
      const documentId = querySnapshot.docs[0].id;
      const documentRef = doc(subCollectionRef, documentId);

      await deleteDoc(documentRef);

      console.log("Veri başarıyla silindi!");

      swal({
        title: "Başarılı",
        text: "Veri başarıyla silindi!",
        icon: "success",
        button: "Tamam",
      });
    } else {
      console.log("Oturum açmış bir kullanıcı bulunamadı.");
    }
  } catch (error) {
    console.error("Veri silme hatası:", error);
    swal({
      title: "Hata",
      text: "Veri silme hatası!",
      icon: "error",
      button: "Tamam",
    });
  }
};


export const saveUserRoomToFirebase = async (roomData, userId) => {
  try {
    const userRoomRef = doc(firestore, "users", userId);
    const subCollectionRoomRef = collection(userRoomRef, "user_room");
    await addDoc(subCollectionRoomRef, roomData);

    console.log("Oda bilgileri başarıyla kaydedildi!");
    swal({
      title: "Başarılı",
      text: "Oda bilgileri başarıyla kaydedildi!",
      icon: "success",
      buttons: {
        cancel: "Cancel",
        confirm: "Okay",
      },
      closeOnClickOutside: false,
    });
  } catch (error) {
    console.error("Oda bilgileri kaydedilirken bir hata oluştu:", error);
    swal({
      title: "Error",
      text: "Oda bilgileri kaydedilirken bir hata oluştu!",
      icon: "error",
      button: "Okay",
    });
  }
};

export const getRoomDataToFromFirebase = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const userRef = doc(firestore, "users", userId);
      const subCollectionRoomRef = collection(userRef, "user_room");
      const querySnapshot = await getDocs(subCollectionRoomRef);

      const roomData = [];
      querySnapshot.forEach((doc) => {
        roomData.push(doc.data());
      });

      console.log("Kullanıcı verileri başarıyla alındı:", roomData);
      return roomData;
    } else {
      console.log("Oturum açmış bir kullanıcı bulunamadı.");
      return null;
    }
  } catch (error) {
    console.error("Kullanıcı verileri alınırken bir hata oluştu:", error);
    // Hata durumunda uygun bir hata işleme mekanizması uygulayabilirsiniz
    return null;
  }
};

export const saveAccommodationToFirebase = async (
  accommodationData,
  userId
) => {
  try {
    const userAccomodationRef = doc(firestore, "users", userId);
    const subCollectionAccomodationRef = collection(
      userAccomodationRef,
      "user_accomodation"
    );
    await addDoc(subCollectionAccomodationRef, accommodationData);

    console.log("Konaklama bilgileri başarıyla kaydedildi!");
    swal({
      title: "Başarılı",
      text: "Konaklama bilgileri başarıyla kaydedildi!",
      icon: "success",
      buttons: {
        cancel: "Cancel",
        confirm: "Okay",
      },
      closeOnClickOutside: false,
    });
  } catch (error) {
    console.error("Konaklama bilgileri kaydedilirken bir hata oluştu:", error);
    swal({
      title: "Error",
      text: "Konaklama bilgileri kaydedilirken bir hata oluştu!",
      icon: "error",
      button: "Okay",
    });
  }
};

export const getAccomodationDataToFromFirebase = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const accomodationRef = doc(firestore, "users", userId);
      const subCollectionAccomodationRef = collection(
        accomodationRef,
        "user_accomodation"
      );
      const querySnapshot = await getDocs(subCollectionAccomodationRef);

      const accomodationData = [];
      querySnapshot.forEach((doc) => {
        accomodationData.push(doc.data());
      });

      console.log("Kullanıcı verileri başarıyla alındı:", accomodationData);
      return accomodationData;
    } else {
      console.log("Oturum açmış bir kullanıcı bulunamadı.");
      return null;
    }
  } catch (error) {
    console.error("Kullanıcı verileri alınırken bir hata oluştu:", error);
    // Hata durumunda uygun bir hata işleme mekanizması uygulayabilirsiniz
    return null;
  }
};

export const saveAppointmentDataToFirebase = async (
  appointmentData,
  userId
) => {
  try {
    const userAppointmentRef = doc(firestore, "users", userId);
    const subCollectionAppointmentRef = collection(
      userAppointmentRef,
      "user_appointment"
    );
    await addDoc(subCollectionAppointmentRef, appointmentData);
    console.log("Randevu bilgileri başarıyla kaydedildi!");
    swal({
      title: "Başarılı",
      text: "Randevu bilgileri başarıyla kaydedildi!",
      icon: "success",
      buttons: {
        cancel: "Cancel",
        confirm: "Okay",
      },
      closeOnClickOutside: false,
    });
  } catch (error) {
    console.error("Randevu bilgileri kaydedilirken bir hata oluştu:", error);
    swal({
      title: "Error",
      text: "Randevu bilgileri kaydedilirken bir hata oluştu!",
      icon: "error",
      button: "Okay",
    });
  }
};

export const getAppointmentDataFromFirebase = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const userRef = doc(firestore, "users", userId);
      const subCollectionAppointmentRef = collection(
        userRef,
        "user_appointment"
      );
      const querySnapshot = await getDocs(subCollectionAppointmentRef);

      const appointments = [];
      querySnapshot.forEach((doc) => {
        const appointmentData = doc.data();
        const { date, time, name, phone, type } = appointmentData;
        appointments.push({ date, time, name, phone, type });
      });

      console.log("Randevu bilgileri başarıyla alındı:", appointments);
      return appointments;
    } else {
      console.log("Oturum açmış bir kullanıcı bulunamadı.");
      return null;
    }
  } catch (error) {
    console.error("Randevu bilgileri alınırken bir hata oluştu:", error);
    // Hata durumunda uygun bir hata işleme mekanizması uygulayabilirsiniz
    return null;
  }
};

export const saveVaccineToFirebase = async (vaccineData, userId) => {
  try {
    const userVaccineRef = doc(firestore, "users", userId);
    const subCollectionVaccineRef = collection(userVaccineRef, "user_vaccine");
    await addDoc(subCollectionVaccineRef, vaccineData);

    console.log("Aşı bilgileri başarıyla kaydedildi!");
    swal({
      title: "Başarılı",
      text: "Aşı bilgileri başarıyla kaydedildi!",
      icon: "success",
      buttons: {
        cancel: "Cancel",
        confirm: "Okay",
      },
      closeOnClickOutside: false,
    });
  } catch (error) {
    console.error("Aşı bilgileri kaydedilirken bir hata oluştu:", error);
    swal({
      title: "Error",
      text: "Aşı bilgileri kaydedilirken bir hata oluştu!",
      icon: "error",
      button: "Okay",
    });
  }
};

export const updateDataToFirebase = async (vaccineData, userId) => {
  try {
    const firestore = getFirestore(app); // Firestore instance'ını al

    const userVaccineRef = collection(
      firestore,
      "users",
      userId,
      "user_vaccine"
    );

    const querySnapshot = await getDocs(
      query(userVaccineRef, where("vaccineName", "==", vaccineData.vaccineName))
    );

    if (querySnapshot.empty) {
      console.log("Seçilen aşı bulunamadı!");
      return;
    }

    // İlk belgeyi güncelle
    const documentId = querySnapshot.docs[0].id;
    const documentRef = doc(userVaccineRef, documentId);

    const currentVaccineData = querySnapshot.docs[0].data();
    const currentVaccineNumber = currentVaccineData.vaccineNumber;

    await updateDoc(documentRef, {
      vaccineNumber: currentVaccineNumber - 1, // Değeri 1 azalt
    });

    console.log("Veri başarıyla güncellendi!");
  } catch (error) {
    console.error("Veri güncelleme hatası:", error);
  }
};

export const updateWarehouseDataToFirebase = async (wareHouseData, userId) => {
  try {
    const firestore = getFirestore(app); // Firestore instance'ını al

    const userVaccineRef = collection(
      firestore,
      "users",
      userId,
      "user_warehouse"
    );

    const querySnapshot = await getDocs(
      query(
        userVaccineRef,
        where("vaccineName", "==", wareHouseData.vaccineName)
      )
    );

    if (querySnapshot.empty) {
      console.log("Seçilen aşı bulunamadı!");
      return;
    }

    // İlk belgeyi güncelle
    const documentId = querySnapshot.docs[0].id;
    const documentRef = doc(userVaccineRef, documentId);

    const currentVaccineData = querySnapshot.docs[0].data();
    const currentVaccineNumber = currentVaccineData.vaccineNumber;

    await updateDoc(documentRef, {
      vaccineNumber: currentVaccineNumber - 1, // Değeri 1 azalt
    });

    console.log("Veri başarıyla güncellendi!");
  } catch (error) {
    console.error("Veri güncelleme hatası:", error);
  }
};

export const getVaccineDataToFromFirebase = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const userRef = doc(firestore, "users", userId);
      const subCollectionVaccineRef = collection(userRef, "user_vaccine");
      const querySnapshot = await getDocs(subCollectionVaccineRef);

      const vaccineData = [];
      querySnapshot.forEach((doc) => {
        vaccineData.push(doc.data());
      });

      console.log("Aşı verileri başarıyla alındı:", vaccineData);
      return vaccineData;
    } else {
      console.log("Oturum açmış bir kullanıcı bulunamadı.");
      return null;
    }
  } catch (error) {
    console.error("Aşı verileri alınırken bir hata oluştu:", error);

    return null;
  }
};

export const saveWarehouseToFirebase = async (wareHouseData, userId) => {
  try {
    const userWarehouseRef = doc(firestore, "users", userId);
    const subCollectionWarehouseRef = collection(
      userWarehouseRef,
      "user_warehouse"
    );
    await addDoc(subCollectionWarehouseRef, wareHouseData);

    console.log("Depo bilgileri başarıyla kaydedildi!");
    swal({
      title: "Başarılı",
      text: "Depo bilgileri başarıyla kaydedildi!",
      icon: "success",
      buttons: {
        cancel: "Cancel",
        confirm: "Okay",
      },
      closeOnClickOutside: false,
    });
  } catch (error) {
    console.error("Depo bilgileri kaydedilirken bir hata oluştu:", error);
    swal({
      title: "Error",
      text: "Depo bilgileri kaydedilirken bir hata oluştu!",
      icon: "error",
      button: "Okay",
    });
  }
};

export const getWarehouseDataToFromFirebase = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const wareHouseRef = doc(firestore, "users", userId);
      const subCollectionWarehouseRef = collection(
        wareHouseRef,
        "user_warehouse"
      );
      const querySnapshot = await getDocs(subCollectionWarehouseRef);

      const wareHouseData = [];
      querySnapshot.forEach((doc) => {
        wareHouseData.push(doc.data());
      });

      console.log("Depo verileri başarıyla alındı:", wareHouseData);
      return wareHouseData;
    } else {
      console.log("Oturum açmış bir kullanıcı bulunamadı.");
      return null;
    }
  } catch (error) {
    console.error("Kullanıcı verileri alınırken bir hata oluştu:", error);
    return null;
  }
};

export const saveWarehouseCreateToFirebase = async (
  warehouseCreateData,
  userId
) => {
  try {
    const userWCRef = doc(firestore, "users", userId);
    const subCollectionWCRef = collection(userWCRef, "user_warehousecreate");
    await addDoc(subCollectionWCRef, warehouseCreateData);

    console.log("Depo adı başarıyla kaydedildi!");
    swal({
      title: "Başarılı",
      text: "Depo adı başarıyla kaydedildi!",
      icon: "success",
      buttons: {
        cancel: "Cancel",
        confirm: "Okay",
      },
      closeOnClickOutside: false,
    });
  } catch (error) {
    console.error("Depo bilgileri kaydedilirken bir hata oluştu:", error);
    swal({
      title: "Error",
      text: "Depo bilgileri kaydedilirken bir hata oluştu!",
      icon: "error",
      button: "Okay",
    });
  }
};

export const getWarehouseCreateDataToFromFirebase = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const userRef = doc(firestore, "users", userId);
      const subCollectionWCRef = collection(userRef, "user_warehousecreate");
      const querySnapshot = await getDocs(subCollectionWCRef);

      const warehouseCreateData = [];
      querySnapshot.forEach((doc) => {
        warehouseCreateData.push(doc.data());
      });

      console.log("Depo verileri başarıyla alındı:", warehouseCreateData);
      return warehouseCreateData;
    } else {
      console.log("Oturum açmış bir kullanıcı bulunamadı.");
      return null;
    }
  } catch (error) {
    console.error("Aşı verileri alınırken bir hata oluştu:", error);

    return null;
  }
};
