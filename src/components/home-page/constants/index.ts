import { TableColumn, TableData } from "@/components/home-page/models";
import { v4 as uuidv4 } from "uuid";

export const ITEMS_PER_PAGE = 5;

export const INITIAL_TABLE_COLUMNS: TableColumn[] = [
  { id: uuidv4(), key: "fullName", label: "Full Name" },
  { id: uuidv4(), key: "age", label: "Age" },
  { id: uuidv4(), key: "email", label: "Email" },
];

export const DUMMY_DATA: TableData[] = [
  {
    id: uuidv4(),
    fullName: "Morteza Asgharzadeh",
    age: 24,
    email: "asgharzadehmorteza@gmail.com",
  },
  {
    id: uuidv4(),
    fullName: "Ali Rafiee",
    age: 34,
    email: "ali.r@yahoo.com",
  },
  {
    id: uuidv4(),
    fullName: "Karim Asgharzadeh",
    age: 55,
    email: "k.asgharzadeh@hotmail.com",
  },
  {
    id: uuidv4(),
    fullName: "Tom Cruise",
    age: 40,
    email: "Tom.c@outlook.com",
  },
  {
    id: uuidv4(),
    fullName: "Hamid Sharifi",
    age: 30,
    email: "sharifi.h@gmail.com",
  },
];
