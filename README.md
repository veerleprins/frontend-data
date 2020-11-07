# Frontend Data
## :black_nib: Description
For the Frontend Data course within the Information Design semester (@cmda-tt) we learn about the library D3 in JavaScript. This allows visualizations to be made.

This repository shows functional programming using survey data from CMD students from the information design semester. Later in the course, different datasets provided by the RDW will be used to create a visualization with the theme of **Cars in the city**. This visualization will visualize the following main question:

**What about parking an electric car compared to parking as a disabled person in the Netherlands?**

In order to be able to visualize this main question, several subquestions have been created. You can find these in my [wiki - Concept]()

<!-- ## Feature -->

## :link: Dataset
The dataset that was used first is the survey data of 93 CMD students who followed the Information Design semester in year 2020.

Later in the project, the datasets supplied by the RDW will be used on behalf of *De Volkskrant*. These are public datasets and can be found at the links below:
* [Specifications parking area in the Netherlands](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s)
* [Location of parking garages in the Netherlands](https://opendata.rdw.nl/Parkeren/GEO-Parkeer-Garages/t5pc-eb34)

## :arrow_down: Install
To start, you must have a code editor installed on your computer. For this project (and most of my projects) I used Visual Studio Code. But you can also use Atom, for example.

### 1. Install npm :computer:
Before getting started, you need to install nvm. nvm can be installed by typing the following line of code in terminal and pressing enter:

```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh ```

If nvm has been successfully installed, you can check the version by typing the following line of code in the terminal and pressing enter:

```nvm --version```

### 2. :open_file_folder: Clone folder
Then you need to download this project and open it with your code editor. To do this, open your terminal with the correct path in which you want this repository. **Example**:

```cd/Desktop/Repos```

Then type the following line of code into your terminal:

```git clone https://github.com/veerleprins/frontend-data.git```

With this line of code, you've successfully downloaded the repository to your desired location.

### 3. Install all the packages :bookmark_tabs:
Then type the code below into your terminal:

``` npm install ```

With this line of code, you download all the packages (like parcel-bundler) you need for this repo.

### 4. :white_check_mark: Start and run the code
Go to the repository in the terminal and add the following line of code below:

``` npm run dev```

Now you can go to http://localhost:1234/ in your browser and view the visualization! :raised_hands:

<!-- ## :globe_with_meridians: Deploy -->
## :books: Sources
**Dataset sources**
* RDW. (October 30, 2020). Open Data Parkeren: SPECIFICATIES PARKEERGEBIED | Open Data | RDW [Dataset]. https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s
* RDW. (October 30, 2020). GEO Parkeer Garages | Open Data | RDW [Dataset]. https://opendata.rdw.nl/Parkeren/GEO-Parkeer-Garages/t5pc-eb34
**Code Sources**
* Pavlutin, D. (September 17, 2020). How to Use Fetch with async/await. Dmitri Pavlutin Blog. https://dmitripavlutin.com/javascript-fetch-async-await/
* MDN. (2020, 17 augustus). Regular expressions. MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
* Stack Overflow, & Shaikh, A. (April 24, 2012). RegEx remove parentheses from string. Stack Overflow. https://stackoverflow.com/questions/10295637/regex-remove-parentheses-from-string
* Stack Overflow, & Down, T. (April 11, 2011). RGB to hex and hex to RGB. Stack Overflow. https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
* MDN. (October 8, 2020). Array.prototype.filter(). MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

## :lock: License
This repo is licensed as [MIT](https://github.com/veerleprins/functional-programming/blob/main/LICENSE) by :copyright: [Veerle Prins](https://github.com/veerleprins), 2020