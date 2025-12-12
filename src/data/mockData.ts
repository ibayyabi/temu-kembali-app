export type Category = 'elektronik' | 'kunci' | 'dompet' | 'botol' | 'lainnya';

export type ItemStatus = 'available' | 'claimed';

export interface LostItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  location: string;
  dateFound: string;
  timeFound: string;
  imageUrl: string;
  status: ItemStatus;
  lockerNumber?: string;
}

export interface UserProfile {
  name: string;
  nim: string;
  faculty: string;
  email: string;
  avatar?: string;
  notificationCount: number;
}

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'elektronik', label: 'Elektronik', icon: 'Smartphone' },
  { id: 'kunci', label: 'Kunci', icon: 'Key' },
  { id: 'dompet', label: 'Dompet', icon: 'Wallet' },
  { id: 'botol', label: 'Botol Minum', icon: 'CupSoda' },
  { id: 'lainnya', label: 'Lainnya', icon: 'Package' },
];

export const locations = [
  'GKU Barat',
  'GKU Timur', 
  'Labtek V',
  'Labtek VI',
  'Labtek VIII',
  'Perpustakaan Pusat',
  'CC Barat',
  'CC Timur',
  'Kantin Basement',
  'Sunken Court',
  'Aula Barat',
  'Aula Timur',
];

export const mockItems: LostItem[] = [
  {
    id: '1',
    name: 'Tumbler Corkcicle Hitam',
    category: 'botol',
    description: 'Tumbler warna hitam matte dengan tutup stainless steel. Ada stiker kecil Gajah ITB di badan tumbler.',
    location: 'GKU Barat',
    dateFound: '2024-12-11',
    timeFound: '14:30',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    status: 'available',
    lockerNumber: 'A-03',
  },
  {
    id: '2',
    name: 'Kunci Motor Honda',
    category: 'kunci',
    description: 'Kunci motor Honda dengan gantungan kunci biru berbentuk helm.',
    location: 'Labtek V',
    dateFound: '2024-12-11',
    timeFound: '10:15',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    status: 'available',
    lockerNumber: 'B-07',
  },
  {
    id: '3',
    name: 'Dompet Kulit Coklat',
    category: 'dompet',
    description: 'Dompet lipat kulit warna coklat tua. Berisi beberapa kartu dan foto.',
    location: 'Perpustakaan Pusat',
    dateFound: '2024-12-10',
    timeFound: '16:45',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
    status: 'available',
    lockerNumber: 'C-12',
  },
  {
    id: '4',
    name: 'Power Bank Anker 10000mAh',
    category: 'elektronik',
    description: 'Power bank warna putih merk Anker dengan kapasitas 10000mAh. Ada goresan kecil di bagian samping.',
    location: 'CC Barat',
    dateFound: '2024-12-10',
    timeFound: '09:00',
    imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
    status: 'claimed',
  },
  {
    id: '5',
    name: 'AirPods Pro Gen 2',
    category: 'elektronik',
    description: 'Earbuds Apple AirPods Pro generasi 2 dengan case putih. Ada ukiran nama "Budi" di case.',
    location: 'Kantin Basement',
    dateFound: '2024-12-09',
    timeFound: '12:30',
    imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
    status: 'available',
    lockerNumber: 'A-09',
  },
  {
    id: '6',
    name: 'Kacamata Minus Frame Hitam',
    category: 'lainnya',
    description: 'Kacamata minus dengan frame plastik hitam. Lensa agak tebal, kemungkinan minus tinggi.',
    location: 'Aula Barat',
    dateFound: '2024-12-09',
    timeFound: '15:20',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
    status: 'available',
    lockerNumber: 'D-02',
  },
  {
    id: '7',
    name: 'Jaket Denim Biru',
    category: 'lainnya',
    description: 'Jaket denim warna biru klasik ukuran M. Ada pin kecil berbentuk bintang di kerah.',
    location: 'Sunken Court',
    dateFound: '2024-12-08',
    timeFound: '17:00',
    imageUrl: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=400&fit=crop',
    status: 'claimed',
  },
  {
    id: '8',
    name: 'USB Flash Drive 32GB',
    category: 'elektronik',
    description: 'Flash drive SanDisk 32GB warna merah-hitam. Label tertulis "Tugas Akhir - Backup".',
    location: 'Labtek VIII',
    dateFound: '2024-12-08',
    timeFound: '11:45',
    imageUrl: 'https://images.unsplash.com/photo-1618410320928-25228d811631?w=400&h=400&fit=crop',
    status: 'available',
    lockerNumber: 'B-15',
  },
  {
    id: '9',
    name: 'Kunci Kos dengan Gantungan',
    category: 'kunci',
    description: 'Satu set kunci (3 kunci) dengan gantungan boneka kelinci pink.',
    location: 'GKU Timur',
    dateFound: '2024-12-07',
    timeFound: '08:30',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=400&fit=crop',
    status: 'available',
    lockerNumber: 'C-08',
  },
  {
    id: '10',
    name: 'Botol Minum Tupperware Pink',
    category: 'botol',
    description: 'Botol minum Tupperware 750ml warna pink dengan tutup flip-top.',
    location: 'Labtek VI',
    dateFound: '2024-12-07',
    timeFound: '13:15',
    imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop',
    status: 'claimed',
  },
];

export const mockUser: UserProfile = {
  name: 'Ahmad Rizki',
  nim: '13521xxx',
  faculty: 'Sekolah Teknik Elektro dan Informatika',
  email: 'ahmad.rizki@students.itb.ac.id',
  notificationCount: 2,
};

export const todayStats = {
  itemsFound: 3,
  itemsClaimed: 1,
  totalInLocker: 8,
};
