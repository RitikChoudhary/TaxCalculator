const readlineSync = require('readline-sync');

let items = [];
let output = [];
let totalAmt = 0;
const basicTax = 10;
const importDuty = 5;
const taxExcludedCategory = ['book' , 'food' , 'medicines'];

const getData = () => {
    let data = readlineSync.question('-> ');

    // quit accepting more inputs if any of the commands fired
    if(data === 'end' || data === 'done' || data === 'quit') {
        calculateTax();
    } else {
        // push data and accept another data using recursion technique
        items.push(data);
        getData();
    }
}

const calculateTax = () => {

    let itemBasicTax = null;
    let itemImportDuty = null;
    let amt = 0;
    let totalTax = 0;

    output = items.map((item) => {

        let itemData = item.split(' ');
        
        // JSON constructor methods used to avoid shallow copy of the object
        let clonedArray = JSON.parse(JSON.stringify(itemData))

        let itemPrice = parseFloat(itemData[itemData.length - 1])
        totalAmt += itemPrice;

        
        // In order to identify whether basicTaxExcluded category product is present or not
        let itemname = clonedArray.splice(0, itemData.length -2);
        let isapplicable = taxExcludedCategory.filter((type) => [...itemname].includes(type));

        // If None fall under BasicTaxExcludedCategory
        if(isapplicable.length === 0){
            
            itemBasicTax = parseFloat((basicTax / 100) * parseFloat(itemPrice)).toFixed(2);
            itemImportDuty = parseFloat((importDuty / 100) * parseFloat(itemPrice)).toFixed(2);
            
            amt = parseFloat(itemPrice);

            itemData[itemData.length -1] = amt.toFixed(2);
            totalTax += parseFloat(itemBasicTax + itemImportDuty);

            return itemData.join(' ');
        } else {

            itemImportDuty = parseFloat((importDuty / 100) * parseFloat(itemPrice)).toFixed(2);

            totalTax += parseFloat(itemImportDuty);
            return item;
        }

    })

    let last = output.pop();

    // Bind tax to last item of the array
    last = `${last} Tax: ${totalTax.toFixed(2)}`;

    output.push(last,`Total: ${totalAmt.toFixed(2)}`);

    // Final Output
    console.log(output)
}

getData();
