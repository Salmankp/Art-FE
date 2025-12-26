import React from 'react';
import styles from '../styles/ArtistsMaster/Main.module.scss';
import {
  ar1,
  ar11,
  ar12,
  ar13,
  ar14,
  ar2,
  ar21,
  ar22,
  ar23,
  ar24,
  ar3,
  ar31,
  ar32,
  ar33,
  ar34,
  ar4,
  ar41,
  ar42,
  ar43,
  ar44,
  ar5,
  ar51,
  ar52,
  ar53,
  ar54,
  ar6,
  ar61,
  ar62,
  ar63,
  ar64,
  ar7,
  ar71,
  ar72,
  ar73,
  ar74,
  ar8,
  ar81,
  ar82,
  ar83,
  ar84,
  ar9,
  ar91,
  ar92,
  ar93,
  ar94,
  ar10,
  ar101,
  ar102,
  ar103,
  ar104,
  franklogo,
} from '../../../assets/index';

const Main: React.FC = () => {
  const data = [
    {
      image: ar11,
      title1: 'Frank Frazetta ',
      edition: '50 Editions',
      title2: 'Silver Warrior',
      title3: 'Warriors',
    },
    {
      image: ar12,
      title1: 'Frank Frazetta ',
      edition: '82 Editions',
      title2: 'Devil’s Generation',
      title3: 'Horror',
    },
    {
      image: ar13,
      title1: 'Frank Frazetta',
      edition: '64 Editions',
      title2: 'Battlestar Galactica',
      title3: 'Infinite Worlds',
    },
    {
      image: ar14,
      title1: 'Frank Frazetta ',
      edition: '14 Editions',
      title2: 'Egyptian Queen',
      title3: 'Fantasy',
    },
  ];
  const data2 = [
    {
      image: ar21,
      title1: 'Juan Giménez',
      edition: '50 Editions',
      title2: 'Pilot',
      title3: 'Infinite Worlds',
    },
    {
      image: ar22,
      title1: 'Juan Giménez',
      edition: '82 Editions',
      title2: 'Vencido',
      title3: 'Warriors',
    },
    {
      image: ar23,
      title1: 'Juan Giménez',
      edition: '82 Editions',
      title2: 'Camelot',
      title3: 'Warriors',
    },
    {
      image: ar24,
      title1: 'Juan Giménez',
      edition: '82 Editions',
      title2: 'Lio Exether',
      title3: 'Infinite Worlds',
    },
  ];
  const data3 = [
    {
      image: ar31,
      title1: 'Sanjulián',
      edition: '50 Editions',
      title2: 'Black Colossus',
      title3: 'Warriors',
    },
    {
      image: ar32,
      title1: 'Sanjulián',
      edition: '82 Editions',
      title2: 'Red Sonja',
      title3: 'Warriors',
    },
    {
      image: ar33,
      title1: 'Sanjulián',
      edition: '82 Editions',
      title2: 'Priestess',
      title3: 'Fantasy',
    },
    {
      image: ar34,
      title1: 'Sanjulián',
      edition: '82 Editions',
      title2: 'Vampirella',
      title3: 'Horror',
    },
  ];
  const data4 = [
    {
      image: ar41,
      title1: 'Heavy Metal',
      edition: '50 Editions',
      title2: 'Taarna',
      title3: '',
    },
    {
      image: ar42,
      title1: 'Heavy Metal',
      edition: '82 Editions',
      title2: 'Cold Dead War',
      title3: '',
    },
    {
      image: ar43,
      title1: 'Heavy Metal',
      edition: '82 Editions',
      title2: 'The Rise',
      title3: '',
    },
    {
      image: ar44,
      title1: 'Heavy Metal',
      edition: '82 Editions',
      title2: 'Covers',
      title3: '',
    },
  ];
  const data5 = [
    {
      image: ar51,
      title1: 'Anna Podedworna',
      edition: '50 Editions',
      title2: 'Gedyneith Flaminica',
      title3: 'Gwent',
    },
    {
      image: ar52,
      title1: 'Anna Podedworna',
      edition: '82 Editions',
      title2: 'Dueling Rapier',
      title3: 'Magic: The Gathering',
    },
    {
      image: ar53,
      title1: 'Anna Podedworna',
      edition: '82 Editions',
      title2: 'Lesser Demons',
      title3: 'Gwent',
    },
    {
      image: ar54,
      title1: 'Anna Podedworna',
      edition: '82 Editions',
      title2: 'Kenku Chick',
      title3: 'Mythical Creatures',
    },
  ];
  const data6 = [
    {
      image: ar61,
      title1: 'Richard Hescox',
      edition: '50 Editions',
      title2: 'Daenerys in Qarth',
      title3: 'Myths & Legends',
    },
    {
      image: ar62,
      title1: 'Richard Hescox',
      edition: '82 Editions',
      title2: 'Blue Abyss',
      title3: 'Mythical Creatures',
    },
    {
      image: ar63,
      title1: 'Richard Hescox',
      edition: '82 Editions',
      title2: 'The Pacifist',
      title3: 'Infinite Worlds',
    },
    {
      image: ar64,
      title1: 'Richard Hescox',
      edition: '82 Editions',
      title2: 'Life Force',
      title3: 'Infinite Worlds',
    },
  ];
  const data7 = [
    {
      image: ar71,
      title1: 'Greg Hildebrandt',
      edition: '50 Editions',
      title2: 'Things Go Better With',
      title3: 'Pin-Up Collection',
    },
    {
      image: ar72,
      title1: 'Greg Hildebrandt',
      edition: '82 Editions',
      title2: 'Star Trek',
      title3: 'Science Fiction',
    },
    {
      image: ar73,
      title1: 'Greg Hildebrandt',
      edition: '82 Editions',
      title2: 'Century',
      title3: 'Kid Stuff',
    },
    {
      image: ar74,
      title1: 'Greg Hildebrandt',
      edition: '82 Editions',
      title2: 'Vampire Kill',
      title3: 'Heavy Metal Collection',
    },
  ];
  const data8 = [
    {
      image: ar81,
      title1: 'Sven Sauer',
      edition: '50 Editions',
      title2: 'Same Old Fears',
      title3: 'Heavy Metal Collection',
    },
    {
      image: ar82,
      title1: 'Sven Sauer',
      edition: '82 Editions',
      title2: 'Unseen Westeros',
      title3: 'Asshai',
    },
    {
      image: ar83,
      title1: 'Sven Sauer',
      edition: '82 Editions',
      title2: 'Unseen Westeros',
      title3: 'Asshai',
    },
    {
      image: ar84,
      title1: 'Sven Sauer with Igo Posavec',
      edition: '82 Editions',
      title2: 'Android Dreams',
      title3: 'Sci-Fi',
    },
  ];
  const data9 = [
    {
      image: ar91,
      title1: 'Ciruelo',
      edition: '50 Editions',
      title2: 'Quetzalcóatl',
      title3: 'Mythical Creatures',
    },
    {
      image: ar92,
      title1: 'Ciruelo',
      edition: '82 Editions',
      title2: 'Hobsyllwin',
      title3: 'Mythical Creatures',
    },
    {
      image: ar93,
      title1: 'Ciruelo',
      edition: '82 Editions',
      title2: 'Chronicles of the Shadow War',
      title3: 'Mythical Creatures',
    },
    {
      image: ar94,
      title1: 'Ciruelo',
      edition: '82 Editions',
      title2: 'Sunset Dragon',
      title3: 'Mythical Creatures',
    },
  ];
  const data10 = [
    {
      image: ar101,
      title1: 'Brothers Hildebrandt',
      edition: '50 Editions',
      title2: 'Smaug',
      title3: 'Tolkien Collection',
    },
    {
      image: ar102,
      title1: 'Brothers Hildebrandt',
      edition: '82 Editions',
      title2: 'Arwen Joins the Quest',
      title3: 'Tolkien Collection',
    },
    {
      image: ar103,
      title1: 'Brothers Hildebrandt',
      edition: '82 Editions',
      title2: 'The Tolkien Years ',
      title3: 'Tolkien Collection',
    },
    {
      image: ar104,
      title1: 'Brothers Hildebrandt',
      edition: '82 Editions',
      title2: 'Clash of the Titans',
      title3: 'Fantasy',
    },
  ];
  const mainData = [
    {
      img: ar1,
      title: 'FRANK FRAZETTA',
      content:
        'Frank Frazetta was an American fantasy and science fiction artist, most noted for his lustrous oil paintings which has led him to be referred to as the "Godfather" of fantasy art, and one of the most renowned illustrators of the 20th century. <br /> <br /> Commencing his commercial career by drawing comic books at the age of 16, he developed his skills and artistry across a variety of genres including westerns, mysteries, funnies and of course fantasy, which would become the style that he was best known for.',
      feature: data,
      logo: franklogo,
    },
    {
      img: ar2,
      title: 'JUAN GIMÉNEZ',
      content:
        'Born on November 26th, 1943 in Mendoza, Argentina, Giménez finished high school as an industrial design major and attended the Academy of Fine Arts in Barcelona, Spain, where he dedicated himself to be an illustrator.<br /><br />He went onto contribute to local magazines such as Zona 84 and Comix International. By then, he had earned a reputation for his exceptional detail of machinery as well as renderings of science fiction characters and concepts. In 1979, he published his first Leo Roa story in France, making his mark on that all-important scene. And in 1980, he served as a creative designer on the "Harry Canyon" segment of the Heavy Metal (1981) film.  For years he continued to have his work showcased in comic magazines and anthologies, and worked for Marvel, DC and other publishers. <br /><br />His legacy and mark on the industry lives on through his amazing work and thriving fan base.',
      feature: data2,
    },
    {
      img: ar3,
      title: 'SANJULIÁN',
      content:
        "With a career spanning more than 60 years, Spanish born artist Sanjulián has created an unparalleled body of work that has reflected every era of Fantasy, Horror, Action and more. Having originally studied art at the Belles Arts of Sant Jordi, one of the top art schools in Spain, he sought work at age 20 through the European art agency Selecciones Ilustrades. Starting in the comic department he quickly found himself in high demand and his work used across the world. <br /><br />Further fame abroad came when he joined USA based Warren publishing where from 1970 his vision of Vampirella established himself as a master. His work on Vampirella and Warren's Creepy and Eerie magazines continues to be in high demand from collectors. He has created for other comic publishers including Marvel and DC and the classic Famous Monsters of Filmland magazine.  <br /><br />Recognized for his realistic subject matter he uses a rich palette to create art that is imbued with his unmistakable style.",
      feature: data3,
    },
    {
      img: ar4,
      title: 'HEAVY METAL',
      content:
        '<b>The World’s Greatest Illustrated Magazine</b> <br />First published in 1977, Heavy Metal, the world’s foremost illustrated fantasy magazine, explores fantastic and surrealistic worlds, alternate realities, science fiction and thriller, in the past, present and future. Writers and illustrators from around the world take you to places you never dreamed existed. Heavy Metal was the first magazine to bring European legends Moebius, Tanino Libertore, Philippe Druillet, Enki Bilal, Pepe Moreno and Philippe Caza to the U.S. as well as showcasing American superstars Richard Corben, Jim Steranko and Bernie Wrightson. The magazine continues to showcase amazing new talent as well as allowing established creators to have “carte blanche”.<br /><br />Heavy Metal magazine is now published six times per year. Most issues feature one or two serialized graphic novels, several short stories, and two artist galleries. Recent creators have featured Grant Morrison, Stephen King, Bart Sears, Tim Seeley and more. With new CEO Matt Medney at the helm, Heavy Metal promises to boldly go where no magazine has gone before. Explore ancient secrets, forgotten worlds and savage futures…experience Heavy Metal.',
      feature: data4,
      about: 'ABOUT THE BRAND',
    },
    {
      img: ar5,
      title: 'ANNA PODEDWORNA',
      content:
        "Anna Podedworna, is an artist based in Warsaw, Poland. She has worked in the entertainment industry as a visual artist for over eight years, producing amazing artwork for projects such as GWENT: The Witcher Card Game and RPG publisher Pathfinder and recently as an artist for Magic: The Gathering. All companies that she has worked for include: Riot Games/ CD Projekt RED/ Wizards of the Coast/ Flying Wild Hog/ Valve/ Paizo. <br/><br/>Originally studying to become an architect and urban planner, she branched out into illustration and later on concept art. Her rendering and story-telling skills earned her jobs and gigs in video games, movies and publishing houses around the world. <br/><br/>Anna's approach to illustration blends elements from different schools of illustration. Taking the dynamic angles and poses from comic books, painterly to realistic rendering from classical art, and bold colours from contemporary art she manages to create imagery captivating a very wide audience. ",
      feature: data5,
    },
    {
      img: ar6,
      title: 'RICHARD HESCOX',
      content:
        'Richard Hescox is an Imaginative Realist painter whose career, initially as an illustrator and more recently as a fine artist creating personal paintings and commissions, has evolved towards the goal of rediscovering the forgotten esthetic sensibilities of the late 19th century fantasy painters.<br/><br/>He has created many illustrations as a book cover artist, a production artist on Hollywood films, and as a concept artist and art director on many projects including a number of computer games such as MechWarriors and Socom 3. His published works include hundreds of book covers, record album covers, movie posters (iconic posters for cult favourite, Swamp Thing) and magazine illustrations.<br/><br/>His paintings have been exhibited in shows held at the Society of Illustrators in New York, the Delaware Art Museum, the Canton Museum of Art and the Allentown Art Museum. His fine art work explores themes of beauty and myth, depicting women as allegorical representations of the varied aspects of nature or as characters out of legend.',
      feature: data6,
    },
    {
      img: ar7,
      title: 'GREG HILDEBRANDT',
      content:
        "The sons of a Chevrolet division chief, Greg Hildebrandt and his identical twin brother, Tim, were born in Detroit, Michigan in 1939. During the 80’s Greg's art appeared on covers for Omni and Heavy Metal. The Franklin Mint and Lenox issued his work on collectors plates, figurines, dolls and swords. In 1984, Greg illustrated Mary Stewart's Merlin trilogy, and he has illustrated 15 classics, including: The Wizard of OZ, Aladdin, Robin Hood, Dracula and Phantom of the Opera. When commenting on Greg's work the New York Times said, \"Fortunate the child or adult who receives a gift of the classics richly illustrated by Greg Hildebrandt.\" <br/><br/>After 12 years apart, the Brothers reunited in 1993. They worked on Marvel posters, pre-production art for Stan Lee and Michael Uslan, producer of the Batman films, a King Tut book, the 1994 Marvel Masterpieces card set, X-Men and Spiderman card sets, Terry & The Pirates comic strip and an X-Men 2099 painted bookshelf edition. In 1999, Greg began to paint a life-long dream. He created his 'American Beauties' series of retro pin-up art. There are presently 90 amazing paintings in this series, and Greg says the possibilities of what to paint next are endless!",
      feature: data7,
    },
    {
      img: ar8,
      title: 'SVEN SAUER',
      content:
        'Sven Sauer is a famous matte-painting artist, known for his work on international movie productions like Lars von Trier’s “Melancholie”, J.J. Abram’s ”Super8” and Joseph Kosinski’s ”Oblivion”. He has received several awards, including an “<b>Academy Award Oscar- Best Visual Achievement</b>“ for his work in Martin Scorsese’s Film “Hugo” and is a three-time EMMY Award winner for “Outstanding Special and Visual Effects” with the HBO Production “Game of Thrones”. He is a member of the “Visual Effects Society” as well as a juror of the “German Filmacademie”<br/><br/>Sven Sauer has evolved a visual technology to transform the stage into a new visual experience for the audience. In 2012, both Sven Sauer and Igor Posavec started creative development in stage design at the State Theatre Wiesbaden. It was there Sauer and Posavec became passionate about different forms of media and new technological innovations. By blending virtual effects into real world settings, they create optical illusions, which are rich in details and profound in sense. ',
      feature: data8,
    },
    {
      img: ar9,
      title: 'CIRUELO',
      content:
        'Ciruelo Cabral reigns supreme in the world of fantasy art. Known simply as Ciruelo, he is an accomplished painter whose consummate skills have brought the dragon back into the limelight. The myths and mysteries surrounding the dragon have captivated people for centuries and his spellbinding visions of this mythical creature will make you a believer. <br/><br/>Ciruelo Cabral was born in Buenos Aires, Argentina on July 20, 1963. Amongst his many clients over the decades are George Lucas, for whom he illustrated the book covers of the trilogy "Chronicles of the Shadow War". Ciruelo has also illustrated the cover for the 10th Anniversary edition of the beloved book ERAGON, by Christopher Paolini.<br/><br/>Always in demand, many of Ciruelo\'s clients and work have included album covers for Steve Vai, Wizards of the Coast (Magic The Gathering), TSR, Berkeley, Tor, Warner, Ballantine, Heavy Metal magazine, Playboy magazine and more.',
      feature: data9,
    },
    {
      img: ar10,
      title: 'BROTHERS HILDEBRANDT',
      content:
        "Greg and Tim Hildebrandt, known as the Brothers Hildebrandt (born January 23, 1939), are American twin brothers who worked collaboratively as fantasy and science fiction artists for many years. They produced illustrations for comic books, movie posters, children's books, posters, novels, calendars, advertisements, and trading cards. Tim Hildebrandt died on June 11, 2006. <br/><br/>Beginning their career in 1959, the Brothers had worked on documentary films and thousands of illustrations for text books, children's books, calendars, book covers, posters, comic books, advertisements, movie posters, production design for films, collectables and trading card games. <br /><br />They became internationally known for the original Star Wars movie poster and the 1976, 1977, and 1978 JRR Tolkien Lord of the Rings calendars. For over 50 years Greg and Tim Hildebrandt have received recognition from their fans in the genres of fantasy, science fiction, comic art, pin-up art, western art, comic strip art, and sequential art.",
      feature: data10,
      about: 'ABOUT THE ARTISTS',
    },
  ];
  return (
    <>
      {mainData.map((mdata) => (
        <div className={styles.wrap}>
          <div className={styles.heading}>{mdata.title}</div>

          <div className={styles.desc}>
            <div className={styles.imgandcontent}>
              <div className={styles.img}>
                <img src={mdata.img} alt="colimg" />
              </div>
              <div className={styles.content}>
                <div className={styles.title}>
                  {mdata.about ? mdata.about : 'ABOUT THE ARTIST'}
                </div>
                <div
                  className={styles.text}
                  dangerouslySetInnerHTML={{ __html: mdata.content }}
                />
                {mdata.logo && (
                  <img
                    src={franklogo}
                    className={styles.franklogo}
                    alt="logo"
                  />
                )}
              </div>
            </div>
          </div>

          <div className={styles.featurewrap}>
            <div className={styles.featureTitle}>
              <div className={styles.line} />
              <div className={styles.featureHeading}>Feature Works</div>
              <div className={styles.line} />
            </div>
            <div className={styles.featureGrid}>
              {mdata.feature.map((data) => (
                <div className={styles.griditem}>
                  <div className={styles.gridimg}>
                    <img src={data.image} alt="colImg" />
                  </div>
                  <div className={styles.title1}>
                    <span>{data.title1}</span>
                    <span className={styles.edition}>{data.edition}</span>
                  </div>
                  <div className={styles.title2}>{data.title2}</div>
                  <div className={styles.title3}>{data.title3}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Main;
