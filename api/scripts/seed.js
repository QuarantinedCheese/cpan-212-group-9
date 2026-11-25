import mongoose from 'mongoose';
import { connectDb } from '../src/db.js';
import { User } from '../src/models/User.js';
import { Favourite } from '../src/models/Favourite.js';


// Same sample data from users data
// No ID needed, since mongoDB handles that.
const sampleUsers = [
    {
        username: 'TestUsername1',
        email: 'TestUserEmail1@gmail.com',
        createdAt: '2020-03-02T14:00:00.023Z'
    },
    {
        username: 'TestUsername2',
        email: 'TestUserEmail2@gmail.com',
        createdAt: '2021-05-02T18:20:21.123Z',
    },
    {
        username: 'TestUsername3',
        email: 'TestUserEmail3@hotmail.com',
        createdAt: '2021-11-23T10:12:34.245Z',
    },
    {
        username: 'TestUsername4',
        email: 'TestUserEmail4@gmail.com',
        createdAt: '2021-01-10T03:34:32.313Z'
    }
];

await connectDb();

// Start from empty
const deleted = await User.deleteMany({});
// insertMany() also checks schema rules, any typos above will not create issues.
const inserted = await User.insertMany(sampleUsers);
export const fallBackUser = inserted[0];

const sampleFavourites = [
    {
        title: 'A Sunday on La Grande Jatte',
        artist: 'Georges Seurat',
        instituteID: '27992',
        userId: inserted[0]._id,
        notes: 'abc',
    },
    {
        title: 'The Cowherd',
        artist: 'Claude Lorrain',
        instituteID: '28401',
        userId: inserted[1]._id,
        notes: 'A favourite artwork.',
    },
    {
        title: 'The Apse of Notre-Dame, Paris',
        artist: 'Ferdinand Jules Albert Gosselin',
        instituteID: '28412',
        userId: inserted[2]._id,
        notes: 'Notre Dame.',
    },
    {
        title: "Yes or No",
        artist: "Julia Margaret Cameron\nEnglish, 1815–1879",
        instituteID: "150131",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "Les-Parents-Terribles series: Yes, but you will see the captain...",
        artist: "Paul Gavarni\nFrench, 1804-1866",
        instituteID: "10945",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "Yes, He Broke the Pot, plate 25 from Los Caprichos",
        artist: "Francisco José de Goya y Lucientes\nSpanish, 1746-1828",
        instituteID: "123786",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "Yes But Is it Torture?",
        artist: "William T. Wiley\nAmerican, 1937-2021",
        instituteID: "224214",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "No. 8. Ye-nan-gyoung [Yenangyaung]. Kyoung.",
        artist: "Linnaeus Tripe\nEnglish, 1822–1902",
        instituteID: "216581",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: `"Is my Wife at home? Yes, monsieur, and your cousin too...," plate 4 from Tout ce qu'on voudra`,
        artist: "Honoré Victorin Daumier (French, 1808-1879)\nlater published in Le Charivari (French, 1832-1915)",
        instituteID: "111988",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "They Say 'Yes' and Give Their Hand to the First Comer, plate two from Los Caprichos",
        artist: "Francisco José de Goya y Lucientes\nSpanish, 1746-1828",
        instituteID: "123763",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "“- Ah yes, those comets, they always predict great misfortunes. It doesn't surprise me at all that poor Madame Galuchet suddenly died last night,” plate 573 from Actualités",
        artist: "Honoré Victorin Daumier\nFrench, 1808-1879",
        instituteID: "84643",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "Snuff Bottle with Bug-Eyed Long-Tailed Fish and Fronds",
        artist: "Ye Zhongsan (Chinese, 1875-1945)",
        instituteID: "88110",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "(He is reading a letter) “A date, could it be from the cute Mme Giraud?? Yes, but it could also come from her husband who wants to pinch me…,” plate 8 from Coquetterie",
        artist: "Honoré Victorin Daumier\nFrench, 1808-1879",
        instituteID: "3403",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "Just like Sisyphus, plate 27 from Actualités",
        artist: "Honoré Victorin Daumier\nFrench, 1808-1879",
        instituteID: "59419",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "Self-Portrait",
        artist: "Walter Shirlaw (American, 1838–1909)",
        instituteID: "11",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "Martin Vanden Bogaert Desjardins",
        artist: "Gérard Edelinck (French, born Flanders, 1640-1707)\nafter Hyacinthe Rigaud (French, 1659-1743)",
        instituteID: "111",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "Remembrance of Italy",
        artist: "Jean-Baptiste-Camille Corot (French, 1796-1875)\nprinted by Auguste Delâtre (French, 1822-1907)\npublished by Cadart et Chavalier, Editeurs (French, 1801-1900)",
        instituteID: "27",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "Priest and Boy",
        artist: "Lawrence Carmichael Earle\nAmerican, 1845-1921",
        instituteID: "4",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "Fishing Craft near the Cliffs at Collioure",
        artist: "Adolphe Appian\nFrench, 1818-1898",
        instituteID: "65",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "Interior of St. Mark's, Venice",
        artist: "David Dalhoff Neal (American, 1838–1915)",
        instituteID: "9",
        userId: inserted[0]._id,
        notes: '',
    },
    {
        title: "Nighthawks",
        artist: "Edward Hopper (American, 1882–1967)",
        instituteID: "111628",
        userId: inserted[0]._id,
        notes: '',
    },
];


const deletedFavourites = await Favourite.deleteMany({});
const insertedFavourites = await Favourite.insertMany(sampleFavourites);

// TODO: HANDLE ARTWORKS (?)

console.log(`Removed ${deleted.deletedCount} users, ${deletedFavourites.deletedCount} favourites, inserted ${inserted.length} users and ${insertedFavourites.length} favorites`);

// Close connection
await mongoose.disconnect();