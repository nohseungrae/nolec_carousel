export const DataMapping = {
  objectMap: (list: any[], func: any) => {
    return Object.fromEntries(Object.entries(list).map(func));
  },
  jsonListMapping: (list: any[], sortKey: string) => {
    type numString = number | string | any;
    const compareBasicFunc = (value1: numString, value2: numString) => {
      const parseA = parseInt(value1);
      const parseB = parseInt(value2);
      if (parseA < parseB) {
        return -1;
      }
      if (parseA > parseB) {
        return 1;
      }
      return 0;
    };
    const compare = (a: any, b: any) => {
      //기본값 0 --> 다른값으로 비교 시작
      const comparison = compareBasicFunc(a[sortKey], b[sortKey]);
      if (comparison === 0) {
        const sameComparison = compareBasicFunc(a.id, b.id);
        return sameComparison;
      }
      return comparison;
    };
    const mappingList = list.map((item: any) => {
      if (!item?.[sortKey]) {
        return (item = { ...item, [sortKey]: 0 });
      }
      if (typeof list[item[sortKey]] === "undefined") {
        item = { ...item, [sortKey]: 0 };
      }
      return item;
    });
    return mappingList.sort(compare);
  },
  mappingType: (filename: string) => {
    if (filename) {
      const splitName = filename?.split(".");
      const mimeType = splitName[splitName?.length - 1].toString();
      const name = splitName.filter((part) => part !== mimeType).join("");
      return { name, mimeType };
    }
  },
};

export const imgPathFunc = {
  getImgPath: (story: any, imgDomain?: string, imgLegacy?: string) => {
    if (story) {
      if (
        story["created_at"] >= "2021-01-19" ||
        story["updated_at"] >= "2021-01-19"
      ) {
        return `${imgDomain}/banner/${story?.img}`;
      }
      return `${imgLegacy}/img/banner/image/${story?.relation_id.toString()}/${
        story?.img
      }`;
    } else {
      return `https://thesaracen.com/static/info/404-page-not-found-2.png`;
    }
  },

  solveImgError: (e: any, story: any) => {
    e.target.src =
      "https://thesaracen.com/static/info/404-page-not-found-2.png";
  },
};
