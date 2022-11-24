import { EntriesType, SumArrObject } from "../interface/Interface";

export function generateDates(start: any, daysAgo: any) {
  let arr = [];

  for (let i = 0; i < daysAgo; i++) {
    const startDate = new Date(start);
    const currentDate = startDate.setDate(new Date(start).getDate() - i);
    const formattedDate = formatDate(currentDate);
    arr.push(formattedDate);
  }
  return arr.reverse();
}
export function formatDate(date: number) {
  return new Date(date).toLocaleDateString("en-CA");
}

export const incomeOrExpense = (incOrex: string, arrIncOrEx: EntriesType[]) => {
  const accumulated = arrIncOrEx.filter((item) => item.Type === incOrex);
  let newGeneratedDates = generateDates(new Date(), new Date().getDate());
  let sumArray: SumArrObject[] = [];
  newGeneratedDates.map((el, index) => {
    let sum = {
      date: el,
      budget: 0,
      name: "",
    };
    accumulated.forEach((item) => {
      if (item.date === el) {
        sumArray.push({
          date: item.date,
          budget: item.budget,
          name: item.name,
        });
      }
    });

    return sumArray.push(sum);
  });

  let json = sumArray;
  const valueFields = ["budget"];

  const finishedArrayIncome = Object.values(
    json.reduce((acc: any, { date, ...values }: any) => {
      acc[date] = acc[date] || { date };
      valueFields.forEach(
        (field) => (acc[date][field] = (acc[date][field] || 0) + values[field])
      );
      return acc;
    }, {})
  );
  let myLast = finishedArrayIncome.map((el: any) => el.budget);
  return myLast;
};
