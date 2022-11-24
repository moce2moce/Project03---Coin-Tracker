
export interface ContextDataType {
  avatar: string;
  setAvatar:React.Dispatch<React.SetStateAction<string>>
  categoryDB: CategoryType[];
  addCategory:(c:CategoryType)=> void
  updateCategory:(c:CategoryType)=> void
  entriesArr:EntriesType[];
  setEntriesArr:React.Dispatch<React.SetStateAction<EntriesType[]>>;
  updateEntries:(entry:EntriesType)=> void;
  setCategoryDB:React.Dispatch<React.SetStateAction<CategoryType[]>>
}



export type CategoryTypeType = "income" | "expense";

export interface EntriesType  {
  id: string;
  categoryId:string;
  Type: CategoryTypeType;
  budget: number;
  icon: string;
  name: string;
  desc?:string;
  date:string;
}

export interface CategoryType {
  id: string;
  Type: CategoryTypeType;
  budget: number;
  isEnabled: boolean;
  icon: string;
  name: string;
}


export interface SumArrObject  {
  date:string;
budget: number;
name: string;
}


export const initialCategories: CategoryType[] = [
  {
    id: "1",
    Type: "expense",
    budget: 0,
    isEnabled: false,
    icon: "local_atm",
    name: "Bills",
  },
  {
    id: "2",
    Type: "expense",
    budget: 0,
    isEnabled: false,
    icon: "restaurant",
    name: "Food",
  },
  {
    id: "3",
    Type: "expense",
    budget: 0,
    isEnabled: false,
    icon: "commute",
    name: "Transportation",
   
  },
  {
    id: "4",
    Type: "expense",
    budget: 0,
    isEnabled: false,
    icon: "local_parking",
    name: "Parking Ticket",
  },
  {
    id: "5",
    Type: "expense",
    budget: 0,
    isEnabled: false,
    icon: "fitness_center",
    name: "Fitness",
  },
  {
    id: "6",
    Type: "expense",
    budget: 0,
    isEnabled: false,
    icon: "bedroom_parent",
    name: "Rent",
  },
  {
    id: "7",
    Type: "expense",
    budget: 0,
    isEnabled: false,
    icon: "currency_bitcoin",
    name: "Crypto",
  },
];


export const initialIcons = [
  {
    icon: "local_atm",
    name: "Salary cut",
  },
  {
    icon: "car_rental",
    name: "Car Fuel",
  },
  {
    icon: "family_restroom",
    name: "Children",
  },
  {
    icon: "local_parking",
    name: "Parking Ticket",
  },
  {
    icon: "restaurant_menu",
    name: "Food",
  },
  {
    icon: "bedroom_parent",
    name: "Rent",
  },
  {
    icon: "currency_exchange",
    name: "Currency-Exchange",
  }
]

