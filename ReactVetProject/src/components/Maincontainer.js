import React from "react";
import "../styles/Maincontainer.css";
import logo2 from "../images/vetror.png";
import report from "../images/report.png";
import vaccine from "../images/vaccine.png";
import where from "../images/where.png";
import vetechlogo1 from "../images/vetlogo.png";
import notification from "../images/notification.png";
import book from "../images/book.png";
import bone from "../images/bone.png";
import { Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

function MainContainer() {
  return (
    <div className="main-container">
      <section className="my-section custom-section overflow-hidden position-relative">
  <div className="container">
    <div className="row align-items-center justify-content-around">
      <div className="col-md-6">
        <h1 className="my-heading">
          Sizleri kurulum gerektiren
          <br/>
          <b>tüm sistemlerden</b>
          
          <b>kurtarıyoruz!</b>
        </h1>
        <Link to="/signin">
          <button className="btn btn--primary type--uppercase">
            7 Gün Ücretsiz Kullanım!
          </button>
        </Link>
        <br/><br/>
        <h3 className="my-subheading">7 Günlük Ücretsiz Kullanım İçin Kart İşlemleri İstenilmez.</h3>
      </div>
      
      <div className="col-md-6 app_screen">
        <img src={logo2} alt="" className="img-fluid" />
      </div>
    </div>
  </div>
</section>




      
          <div className="flash">
          <div className="row">
            <div className="col-md-12">
              <span>
                <br></br>
                Bugün Vetech'i satın aldığınızda ömür boyu ekstra ücret vermeden
                destek ve geliştirme güncellemelerini alın.
              </span>
            </div>
          </div>
          </div>
        
     
      <section className="sec2">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 col-lg-7 col-xl-6 mx-auto">
              <div className="section-title reveal text-center mb-80">
                
                <h4>
                  Vetech Veteriner Yönetim Sistemini kullanan hekimlerimizin iş
                  kolaylığını sağlamak adına bu sistemle birlikte kendilerine
                  sunulan özelliklere göz atalım.
                </h4>
              </div>
            </div>
          </div>
          <div
            className="row border-bottom-light space-botom reveal"
            style={{ marginTop: "15px" }}
          >
            <div className="col-12 col-md-6 col-lg-4 mb-30 mb-lg-0">
              <div className="featrues">
                <div className="media">
                  <img src={report} className="mr-3" alt="..." />
                  <div className="media-body">
                    <h5> Hasta Tıbbi Geçmişi </h5>
                    <p>
                      Veteriner hekimlerimiz, tıbbi geçmişlerini kontrol ederek
                      hastalıkların önüne geçebilmesi adına doğru ve zamanında
                      teşhis ile tedaviler için, tıbbi geçmiş bilgilerini
                      kullanmasına olanak tanıyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-30 mb-lg-0">
              <div className="featrues">
                <div className="media">
                  <img src={vaccine} className="mr-3" alt="..." />
                  <div className="media-body">
                    <h5> Stok Takibi</h5>
                    <p>
                      {" "}
                      Hekimlerimiz stokta ki aşılarının ve diğer ürünlerinin
                      mevcut sayısını kendi girmiş oldukları bilgiler dahilinde
                      takip edebilmekte ve her bir hasta kaydında kullanılan
                      ürünler stokta ki değişime bağlı tutulmaktadır.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-30 mb-lg-0">
              <div className="featrues">
                <div className="media">
                  <img src={where} className="mr-3" alt="..." />
                  <div className="media-body">
                    <h5>Hasta Takibi</h5>
                    <p>
                      {" "}
                      Veteriner hekimlerimiz müşteri trafik akışını daha
                      kontrollü hale getirebilmesi adına hastaların mevcut
                      sağlık durumlarını müşterilerin kolayca erişebilmesine
                      yönelik, veterinerler tarafından sisteme girilen mevcut
                      durumları, müşteriler hastalara verilen çip numarasını
                      sistemde aratarak veteriner hekimlerimizi meşgul etmeden
                      erişebilmektedir.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-30 mb-lg-0">
              <div className="featrues">
                <div className="media">
                  <img src={notification} className="mr-3" alt="..." />
                  <div className="media-body">
                    <h5>Bildirim Yönetimi</h5>
                    <p>
                      {" "}
                      Hastaların aşılarına, ilaçlarına, randevularına, diyet
                      listelerine yönelik hatırlatıcılar vasıtasıyla, seçilen
                      tarih ve saatte veteriner hekimlerimizin bildirim
                      kutularında hatırlatıcılar gösterilmekte ve olası
                      aksaklıkların önüne geçilmektedir.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-30 mb-lg-0">
              <div className="featrues">
                <div className="media">
                  <img src={book} className="mr-3" alt="..." />
                  <div className="media-body">
                    <h5>Randevu Yönetimi</h5>
                    <p>
                      {" "}
                      Randevularınızın tamamını görüntüleyip dilediğiniz tarihte
                      yeni bir randevu oluşturabilirsiniz. Yaklaşan
                      randevularınız sizlere sistemimiz tarafından
                      hatırlatılmaktadır.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-30 mb-lg-0">
              <div className="featrues">
                <div className="media">
                  <img src={bone} className="mr-3" alt="..." />
                  <div className="media-body">
                    <h5>Diyet Takibi</h5>
                    <p>
                      {" "}
                      Veteriner hekimlerimizin her bir hasta profiline yönelik
                      oluşturabileceği diyet listesiyle birlikte günlük
                      tüketilen su miktarı, gıda miktarı gibi bilgilerin
                      kaydedilmesine olanak tanınmaktadır.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title reveal text-center mb-80">
                <h2>
                  Vetech Veteriner Yönetim Sistemi
                </h2>
                <p>
                  Veteriner hasta takip programı, günümüzde veterinerler için
                  son derece önemli yazılımlardır. Bu tür yazılımlar ile
                  veteriner hekimleri, hasta kayıtlarını kolayca tutabilir ve
                  hasta sahiplerine kolay, hızlı ve kaliteli bir şekilde hizmet
                  verebilirler. Belli aralıklarla hasta sahipleri veteriner
                  hekimleri ziyaret etmektedirler. Hastalarının sağlık
                  geçmişlerinin takibi için veteriner klinik uygulaması bu
                  yüzden çok önemlidir. Güvenilir ve sağlıklı bir program
                  veteriner hekimlerimizin klinikte işini bir hayli
                  hafifletmektir.  veteriner klinik yazılımı bu noktada
                  tüm hekimlerimizin isteklerine karşılık verebilmek adına
                  ortaya çıkmıştır.  içerisinde raporlamalar, stok
                  takibi, ürün satışı, hasta sahibine ait bakiye bilgilerini
                  görebilme, toplu sms, sınırsız bir şekilde hasta sahibi ve
                  hasta oluşturmakla birlikte oluşturduğunuz randevuları 1 gün
                  önceden sizin yerinize hasta sahiplerine bildirerek işinizi
                  kolaylaştırmaktadır.  üzerinden oluşturduğunuz bu
                  randevuların takibi hasta sahipleri tarafından da
                  yapılabilmektedir. Hasta sahipleri oluşturulan randevuları
                  mobil uygulamamızı indirip hastasına ait tüm aşı takvimini
                  görebilmektedir.
                </p>
                <h2>Güvenilir, Hızlı ve Uygun Veteriner Yazılımı</h2>
                <p>
                   Adından da anlaşıldığı üzere bulut tabanlı bir
                  yazılımdır. Hiçbir şekilde bilgisayarlarınıza kurulum
                  yapılmaz. Bu sayede bilgisayarınız arızalansa dahi
                  bilgileriniz kaybolmaz. Hem işletmenizi hem de müşterileriniz
                  ile ilgili bilgileri online platformlara taşırken
                  sunucularımızda gerekli güvenlik önlemlerini almaktayız.
                  İnterneti olan tüm cihazlarınızdan  nerde olursanız
                  olun erişim sağlayabilirsiniz.  veteriner klinik
                  yazılımı için girişte ekstra lisans ücreti ödemenize gerek
                  yoktur. Uygulamamız sürekli güncellenmektedir ve bu gelen
                  güncellemeler için de ekstra ücret talep edilmez. Sizlere yardım etmekten memnuniyet duyuyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer-distributed">

  <div className="footer-left">

  <img src={vetechlogo1} alt="" className="img-fluid" />

    

    <p className="footer-company-name">Vetech © 2023</p>
  </div>

  <div className="footer-center">

    <div>
      <i className="fa fa-map-marker"></i>
      <p><span>Ostim, 100. Yıl Blv 55/F, 06374 Ostim Osb</span> Yenimahalle, Ankara</p>
    </div>

    <div>
      <i className="fa fa-phone"></i>
      <p>(0312) 386 10 92</p>
    </div>

    <div>
      <i className="fa fa-envelope"></i>
      <p><a href="mailto:support@company.com">ostimtech@support.com</a></p>
    </div>

  </div>

  <div className="footer-right">

    <p className="footer-company-about">
      <span>Destek</span>
      7/24 Destek sağlayan teknik ekibimiz ile birlikte sizlerin hizmetinizdeyiz.
      <br></br>
      Vetech, ilgilinize armağandır.
    </p>

    

  </div>

</footer>


    </div>
  );
}

export default MainContainer;
