# login-form
Proje Açıklaması
Bu proje, kullanıcı girişi için temel bir form uygulamasıdır. Form, email ve şifre alanları ile kullanım şartlarını kabul etme seçeneği içermektedir. Projenin ana amacı, form doğrulama işlemlerinin düzgün çalışmasını sağlamak ve bu işlemleri test etmektir.

Form Özellikleri
Form aşağıdaki alanlardan oluşmaktadır:
* Email alanı
* Şifre alanı
* Şartları kabul ediyorum onay kutusu

Form doğrulama kuralları şunlardır:

* Email alanı geçerli bir email formatında olmalı (regex kullanılarak kontrol edilir)
* Şifre alanı güçlü şifre kriterlerini karşılamalı (regex kullanılarak kontrol edilir)
* Kullanıcı, şartları kabul etmek zorundadır

Tüm doğrulama kuralları geçildiğinde giriş butonu aktif hale gelir, aksi takdirde buton devre dışı kalır.
Test Senaryoları
Projede Cypress kullanılarak iki farklı test senaryosu yazılmıştır:
1. Başarılı Form Gönderimi

Tüm alanlar doğru şekilde doldurulduğunda form başarıyla gönderilir ve başarı sayfası açılır.

2. Hatalı Durumlar

Geçersiz email girişi: Ekranda ilgili hata mesajı görünür ve buton devre dışı kalır.
Geçersiz email ve şifre: Ekranda her iki alan için de hata mesajları görünür ve buton devre dışı kalır.
Doğru bilgiler ancak şartlar kabul edilmemiş: Buton devre dışı kalır.
