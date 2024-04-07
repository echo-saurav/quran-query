


export function saveLanguageSettings(getEn, getBn, getAr) {
    'use client'
    localStorage.setItem('enableEnglish', getEn.toString());
    localStorage.setItem('enableBengali', getBn.toString());
    localStorage.setItem('enableArabic', getAr.toString());
}



export function getLanguageSettings() {
    'use client'
    // Retrieve language settings from storage
    const enableEnglish = localStorage.getItem('enableEnglish');
    const enableBengali = localStorage.getItem('enableBengali');
    const enableArabic = localStorage.getItem('enableArabic');

    // Parse retrieved values to boolean (or default to false if not found)
    const getEn = enableEnglish ? JSON.parse(enableEnglish) : true;
    const getBn = enableBengali ? JSON.parse(enableBengali) : true;
    const getAr = enableArabic ? JSON.parse(enableArabic) : false;

    // Return the boolean values
    return { getEn, getBn, getAr };
}





export function saveQuery(str) {
    'use client'
    // Retrieve existing array from local storage or create a new one if it doesn't exist
    let arrayFromLocalStorage = JSON.parse(localStorage.getItem('queries') || '[]');

    if (!arrayFromLocalStorage.includes(str)) {

        // Add the new string to the array
        arrayFromLocalStorage.push(str);

        // Check if the array length exceeds 100
        if (arrayFromLocalStorage.length > 10) {
            // Remove the last item from the array
            arrayFromLocalStorage.splice(-1, 1);
        }

        // Save the updated array back to local storage
        localStorage.setItem('queries', JSON.stringify(arrayFromLocalStorage));
    }
}

export function getQueries() {
    'use client'
    let arrayFromLocalStorage = JSON.parse(localStorage.getItem('queries') || '[]');
    return arrayFromLocalStorage;
}


export function getDefaultTafsirTab() {
    'use client'
    const tafsirTab = localStorage.getItem('tafsirTab');
    const tab = tafsirTab ? tafsirTab : 'en';
    return tab
}

export function setDefaultTafsirTab(tab) {
    'use client'
    localStorage.setItem('tafsirTab', tab);
}