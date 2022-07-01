#!/bin/node

/**
 * This script parses pre-fetched data from Pexels in PEXELS_DATA_PATH and saves them to STORE_DATA_PATH.
 * It randomizes prices and a few other things to make things interesting.
 *
 * If you want to get completely fresh data from Pexels:
 *
 *      1. Go to https://www.pexels.com/ and open the browser JS console
 *      2. Copy initial data with this command:
 *              ```js
 *              copy(JSON.parse(document.querySelector("#__NEXT_DATA__").text).props.pageProps.initialData.data)
 *              ```
 *      3. Put it inside the products array in PEXELS_DATA_PATH
 *      4. If you want more results:
 *              a. Go to the Network tab
 *              b. Scroll down on the page until the /feed fetch request fires
 *              c. Copy values of the `data` key into the products array in PEXELS_DATA_PATH
 *              d. Repeat until you have enough products
 *
 * You may ask "Why don't you use Pexels API for this?"
 * Well, I'm too lazy to sign up and I don't have to make any requests ever again this way.
 * It's cached forever, even if their API randomly breaks.
 */

import { readFileSync, writeFileSync } from "node:fs";

// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from "@faker-js/faker";

import { PEXELS_DATA_PATH, STORE_DATA_PATH, PexelsPhoto, StoreProduct, JsonData } from "../src/api";

const pexelsData: JsonData<PexelsPhoto[]> = JSON.parse(readFileSync(PEXELS_DATA_PATH, "utf-8"));
const data = new Set<StoreProduct>();

for (const { attributes } of pexelsData.products) {
    data.add({
        id: attributes.id,
        title: attributes.title ?? "Artwork",
        slug: attributes.slug,
        description: attributes.description ?? faker.lorem.paragraphs(3, "\n\n"),
        image: attributes.image,
        width: attributes.width,
        height: attributes.height,
        main_color: attributes.main_color,
        tags: attributes.tags,
        user: attributes.user,
        license: attributes.license,
        price: faker.datatype.number({ min: 5, max: 250, precision: 0.01 }),
        currency: "USD",
        bestseller: !!Math.round(Math.random()),
    });
}

writeFileSync(STORE_DATA_PATH, JSON.stringify({ products: [...data] }, null, 2));

console.log(`✅ Data converted and stored in ${STORE_DATA_PATH}`);
