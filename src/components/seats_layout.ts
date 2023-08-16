export const seatlayouts = (solds: any, totalseats: number) => {
    const rows = ["A", "B", "C", "D", "E", "F"];
    const all = [];
    for (let rol of rows) {
      const col_s = [];
      for (let i = 1; i < totalseats / rol.length + 2; i++) {
        // totalseats:20 ,col: (1,5), 5 row 4 column
        const seatNo = i + rol;
        const isSold = solds.includes(seatNo);
        const cols = { seatNo: seatNo, sold: isSold };
        col_s.push(cols);
      }
      all.push(col_s);
    }
    return all;
  };