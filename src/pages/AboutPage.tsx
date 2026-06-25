import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, MapPin, Clock } from 'lucide-react';

const stats = [
  { value: '15.000+', label: 'Mutlu Müşteri', Icon: Users },
  { value: '12', label: 'Yıllık Tecrübe', Icon: Award },
  { value: '15', label: 'Ülke', Icon: MapPin },
  { value: '7/24', label: 'Müşteri Desteği', Icon: Clock },
];

const team = [
  { name: 'Ahmet Yılmaz', role: 'Kurucu & CEO', emoji: '👨‍💼' },
  { name: 'Fatma Kaya', role: 'Operasyon Müdürü', emoji: '👩‍💼' },
  { name: 'Mehmet Demir', role: 'Veteriner & Kalite', emoji: '👨‍⚕️' },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF9]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-brown-dark to-brand-brown py-16">
        <div className="container-site">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">Hakkımızda</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              2012'den bu yana binlerce müşterimize güvenilir, şeffaf ve profesyonel kurban hizmeti sunuyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="container-site py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge-green mb-4">Misyonumuz</span>
            <h2 className="section-title mt-3 mb-5">
              Güven, Şeffaflık ve Profesyonellik
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Keçikoyun, kurban satın alma ve vekalet sürecini tamamen dijitalize eden, modern ve güvenilir bir ticari platformdur. Amacımız, kurban sahiplerinin sürecin her adımından haberdar olmasını sağlamaktır.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              İster kendi adınıza, ister başkası adına kurban vekalet edin; kesim sürecini video ve belgelerle takip edin, etlerin ihtiyaç sahiplerine ulaştığını belgeli şekilde görün.
            </p>
            <Link to="/nasil-calisir" className="btn-secondary inline-flex">
              Nasıl Çalışır? <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map(({ value, label, Icon }) => (
              <div key={label} className="bg-white rounded-3xl p-6 shadow-card text-center">
                <Icon size={24} className="text-brand-green mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-16">
        <div className="container-site max-w-4xl">
          <h2 className="section-title text-center mb-12">Neden Keçikoyun?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { emoji: '🔍', title: 'Şeffaf Süreç', desc: 'Kesim anından teslimatına kadar her adım kayıt altında. Video ve belgeler size iletilir.' },
              { emoji: '🛡️', title: 'Dini Uygunluk', desc: 'Tüm kesimler uzman kasaplar tarafından dini kurallara uygun gerçekleştirilir.' },
              { emoji: '⚡', title: 'Hızlı ve Kolay', desc: 'Dakikalar içinde sipariş tamamlanır. Karmaşık süreçler yok, her şey dijital.' },
            ].map((val) => (
              <div key={val.title} className="text-center p-6 rounded-3xl bg-brand-cream">
                <span className="text-4xl mb-4 block">{val.emoji}</span>
                <h3 className="font-bold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-16 bg-[#FAFAF9]">
        <div className="container-site max-w-3xl text-center">
          <h2 className="section-title mb-10">Ekibimiz</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-3xl p-6 shadow-card">
                <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {member.emoji}
                </div>
                <p className="font-bold text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-500 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-brand-green-dark py-16 text-center">
        <div className="container-site">
          <h2 className="text-3xl font-bold text-white mb-4">Güvenle Kurban Alın</h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            12 yıllık tecrübemizle kurban siparişinizi profesyonelce yönetiyoruz.
          </p>
          <Link to="/kurbanlıklar" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-green font-bold rounded-2xl hover:bg-brand-cream transition-all">
            Hemen Başla <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
