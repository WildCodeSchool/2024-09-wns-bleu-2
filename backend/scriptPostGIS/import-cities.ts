import "reflect-metadata";
import { dataSourceGrumpyCar } from "./dataSource";
import { createReadStream } from "fs";
import { parse } from "csv-parse";

async function dataSourceInitialize () {
   await dataSourceGrumpyCar.initialize();
   createReadStream("FR.txt")
      .pipe(parse({ delimiter: "\t", columns: true }))
      .on("data", async (row) => {console.log(row)})
}

dataSourceInitialize();