import ImageCarousel from '../components/ImageCarousel';
import { Titre } from "../components/Titre";
import { Intro } from "../components/Intro";
import { OverlappingDivs } from '../components/OverlappingDivs';
import Card from '../components/Card';
import ProjetsCarousel from '../components/ProjetsCarousel';
import EmbeddedMap from '../components/EmbeddedMap';
import QualityLogos from '../components/QualityLogos'; // Importez le composant QualityLogos
import ArticleComponent from '../components/ArticleComponent';





export  const Accueil = () => {

    const qualityLogos = [
        'images/qualite1.png',
        'images/logo40.png',
        'images/CMA.jpg',
        // Ajoutez les URLs des logos de qualité
      ];

    return (
        <main>
            <div className="mt-12" >
                <ImageCarousel />
            </div>
            <Titre texte="André BAUMGART et Fils SARL" />
            <Intro />


            <Titre texte="Il parle de nous !" />
            <div>
              <ArticleComponent />
            </div>




            <Titre texte="Nos différents services" />
            
            {/* Div avec marges à gauche et à droite */}
            <div
                className="mx-4 md:mx-0 mt-4"
                style={{
                    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 50%, transparent), url(images/bardage.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                }}
                >
                {/* Cartes affichées horizontalement sur ordinateur et verticalement sur mobile */}
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mx-2 md:mx-10 p-4 md:p-10 
 bg-customGrey rounded-xl " >
  
  <div className="w-full md:w-1/3 flex justify-center items-center " >
    
    <Card
      title="Couverture"
      text="Des toits solides, une protection fiable. Confiez votre couverture à nos experts."
      logoUrl="images/iconetoit.png"
      sectionId="couverture"
      backgroundColor='bg-customGrey'
      titleColor='text-customGreen'
    />
  </div>
  <div className="w-full md:w-1/3 flex justify-center items-center " >
    <Card
      title="Zinguerie"
      text="Étanchéité garantie. Traveaux sur mersures. Découvrez nos services de zinguerie professionnels."
      logoUrl="images/iconesouder.png"
      sectionId="zinguerie"
      backgroundColor='bg-customGrey'
      titleColor='text-customGreen'
    />
  </div>
  <div className="w-full md:w-1/3 flex justify-center items-center " >
    <Card
      title="Bardage & Isolation"
      text="Confort et esthétique réunis. Optez pour notre isolation et nos bardages de qualité."
      logoUrl="images/iconebardage.png"
      sectionId="isolation"
      backgroundColor='bg-customGrey'
      titleColor='text-customGreen'
    />
   
  </div>
  
</div>


            </div>
            <Titre texte="Nos Projets" />
            <div className="mt-12">
            <ProjetsCarousel
                images={[
                'images/carousel1.png',
                'images/carousel2.png',
                'images/carousel3.png',
                // ... Ajoutez autant d'images que nécessaire
                ]}
                captions={[
                'Toiture à Logelbach',
                'Maison  au centre ville de Munster',
                'Marcairie perdue dans la montagne',
                // ... Ajoutez autant de légendes que nécessaire
                ]}
                description={[
                "Couverture en tuiles Arboise rectangulaire couleur ardoisée  de chez Edilians, très beau résultat final qui rappelle l'ancienne couverture en ardoise, Habillage des planches de rives en tole prélaquée blanche pour l'accord avec la façade qui a été isolée.",
                "Maison  au centre ville de Munster , le magasin de chaussures Élégance à revêtu sa nouvelle toiture en Kergoat de chez Eternit . Avec réfection de la charpente des lucarnes,  habillés sur mesures en tôles pré laquée blanche Ral 9010 ",
                "Encore une marcairie perdue dans la montagne rénovée. Les deux bâtiments remis à neuf. Couverture en tuiles H10 nuagés de chez Edilians, avec isolation en sarking épaisseur 130mm, R = 6. Le top pour une maison en montagne",
                // ... Ajoutez autant de descriptions que nécessaire
                ]}
                IDs={[
                    'p1',
                    'p2',
                    'p3',
                    // ... Ajoutez autant de légendes que nécessaire
                    ]}
            />
            </div>
            <Titre texte="Retrouvez-nous ici" />

            <EmbeddedMap apiKey="AIzaSyB543agVBBVe77o50drfonN65waQ9TEq3E"  
                latitude={48.8566} longitude={2.3522} />


            <Titre texte="Une entreprise qualifié" />
            <QualityLogos logos={qualityLogos} />


            </main>



    )
}