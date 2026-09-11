import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './About.css';

const team = [
  { name: 'Ana Anić', role: 'Osnivačica i baštovanka' },
  { name: 'Marko Marković', role: 'Stručnjak za sobno bilje' },
  { name: 'Jovana Jovanović', role: 'Korisnička podrška' },
];

const stats = [
  { label: 'Godina iskustva', value: '12+' },
  { label: 'Vrsta biljaka', value: '150+' },
  { label: 'Zadovoljnih kupaca', value: '3.000+' },
];

export function About() {
  useDocumentTitle('O nama');

  return (
    <div className="about">
      <section className="about__intro">
        <h1>O Web Rasadniku</h1>
        <p>
          Web Rasadnik je porodični rasadnik koji od 2013. godine gaji i prodaje sobno i
          baštensko bilje, sukulente i sadnice. Verujemo da svako zaslužuje malo zelenila u
          svom prostoru, bez obzira na iskustvo u baštovanstvu.
        </p>
      </section>

      <section className="about__stats">
        {stats.map((stat) => (
          <div key={stat.label} className="about__stat">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="about__team">
        <h2>Naš tim</h2>
        <div className="about__team-grid">
          {team.map((member) => (
            <div key={member.name} className="about__team-card">
              <div className="about__team-avatar">🌿</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
