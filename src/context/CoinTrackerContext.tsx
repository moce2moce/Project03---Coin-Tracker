import React, { createContext, useEffect, useState } from "react";
import {
  CategoryType,
  ContextDataType,
  EntriesType,
  initialCategories
} from "../interface/Interface";

interface Props {
  children: React.ReactNode;
}

export const CoinTrackerContext = createContext<ContextDataType>({
  avatar: "",
  setAvatar: () => {},
  categoryDB: [],
  addCategory: (c: CategoryType) => {},
  updateCategory: (c: CategoryType) => {},
  entriesArr: [],
  setEntriesArr: () => {},
  updateEntries: (entry: EntriesType) => {},
  setCategoryDB: () => {},
});

const CoinTrackerContextProvider: React.FC<Props> = ({ children }) => {
  const [categoryDB, setCategoryDB] = useState<CategoryType[]>(
    JSON.parse(localStorage.getItem("categories") as string) ||
      initialCategories
  );

  // // Loading Avatar Logo for signIn Page

  const [avatar, setAvatar] = useState(
    JSON.parse(localStorage.getItem("avatar")!) || ""
  );

  useEffect(() => {
    let avatarPhoto = localStorage.getItem("avatar");
    if (avatarPhoto) {
      setAvatar(JSON.parse(avatarPhoto));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("avatar", JSON.stringify(avatar));
  }, [avatar]);

  //-----------

  //Add New Category Modal

  useEffect(() => {
    let localStorageCategory = localStorage.getItem("categories");
    if (localStorageCategory) {
      setCategoryDB(JSON.parse(localStorage.getItem("categories")!));
    } else {
      setCategoryDB(initialCategories);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categoryDB));
  }, [categoryDB]);

  const addCategory = (category: CategoryType) => {
    setCategoryDB([...categoryDB, category]);
    localStorage.setItem(
      "categories",
      JSON.stringify([...categoryDB, category])
    );
  };

  const updateCategory = (category: CategoryType) => {
    let updateCategoryItem = categoryDB.find((el) => el.id === category.id);
    if (updateCategoryItem) {
      setCategoryDB(
        categoryDB.map((item) => {
          if (item.id === updateCategoryItem?.id) {
            return {
              ...item,
              id: category.id,
              name: category.name,
              icon: category.icon,
              budget: category.budget,
              isEnabled: category.isEnabled,
              Type: category.Type,
            };
          } else {
            return item;
          }
        })
      );
      localStorage.setItem("categories", JSON.stringify(categoryDB));
    }
  };
  //---------------------

  /// ENTRIES

  const [entriesArr, setEntriesArr] = useState<EntriesType[]>(
    JSON.parse(localStorage.getItem("entries")!) || []
  );

  useEffect(() => {
    let entriesLocalStorage = localStorage.getItem("entries");
    if (entriesLocalStorage) {
      setEntriesArr(JSON.parse(entriesLocalStorage));
    }
  }, []);

  const updateEntries = (entry: EntriesType) => {
    let updateEntries = entriesArr.find((el) => el.id === entry.id);
    if (updateEntries) {
      setEntriesArr(
        entriesArr.map((item) => {
          if (item.id === updateEntries?.id) {
            return {
              ...item,
              id: entry.id,
              name: entry.name,
              icon: entry.icon,
              budget: entry.budget,
              Type: entry.Type,
              desc: entry.desc,
              date: entry.date,
            };
          } else {
            return item;
          }
        })
      );
      localStorage.setItem("categories", JSON.stringify(categoryDB));
    }
  };

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entriesArr));
  }, [entriesArr]);

  //da se vidi dali da go ostavam voopsto ili da go brisam

  useEffect(() => {
    if (entriesArr) {
      localStorage.removeItem("entries");
    }

    if (categoryDB === initialCategories) {
      localStorage.removeItem("categories");
    }
  }, []); // eslint-disable-line

  //-------------

  return (
    <CoinTrackerContext.Provider
      value={{
        avatar,
        setAvatar,
        categoryDB,
        addCategory,
        updateCategory,
        entriesArr,
        setEntriesArr,
        updateEntries,
        setCategoryDB,
      }}
    >
      {children}
    </CoinTrackerContext.Provider>
  );
};

export default CoinTrackerContextProvider;
