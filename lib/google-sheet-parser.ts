import { Product } from '@/types/product';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0wlpo9G9uEC1Nb_EPSqwFL4fflj-GKK3PP_nF3Px0xDYZJtBcz1vcaITw2SN9JbdDmzRTA4SMZXkN/pub?output=csv';

/**
 * Parses a CSV string into an array of objects.
 * Handles quoted fields, commas within fields, and proper escaping.
 */
function parseCSV(csvText: string): Record<string, string>[] {
  // First, split into lines while handling quoted newlines
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = i + 1 < csvText.length ? csvText[i + 1] : '';
    
    // Handle quotes
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Double quotes inside quotes represent a single quote
        currentField += '"';
        i++; // Skip the next quote
      } else {
        // Toggle insideQuotes flag
        insideQuotes = !insideQuotes;
      }
    } 
    // Handle commas
    else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } 
    // Handle newlines
    else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !insideQuotes) {
      currentRow.push(currentField.trim());
      rows.push(currentRow);
      currentRow = [];
      currentField = '';
      if (char === '\r') i++; // Skip \n in \r\n
    } 
    // Normal character
    else {
      currentField += char;
    }
  }
  
  // Add the last field and row if there are any
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    rows.push(currentRow);
  }
  
  // Convert rows to objects using headers
  if (rows.length < 2) return []; // Needs at least headers and one data row
  
  const headers = rows[0];
  const data: Record<string, string>[] = [];
  
  for (let i = 1; i < rows.length; i++) {
    // Skip empty rows
    if (rows[i].length === 0 || (rows[i].length === 1 && rows[i][0] === '')) {
      continue;
    }
    
    const obj: Record<string, string> = {};
    const currentRow = rows[i];
    
    // Skip rows with invalid number of columns
    if (currentRow.length !== headers.length) {
      console.warn(`Row ${i} has ${currentRow.length} columns, expected ${headers.length}. Skipping.`);
      continue;
    }
    
    headers.forEach((header, j) => {
      obj[header] = currentRow[j];
    });
    
    data.push(obj);
  }
  
  return data;
}

export async function fetchProductsFromSheet(): Promise<Product[]> {
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL, {
      next: { revalidate: 3600 } // Revalidate data every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    }

    const csvText = await response.text();
    const parsedData = parseCSV(csvText);

    // Map parsed data to Product interface
    // Ensure your Google Sheet column headers exactly match these keys (case-sensitive)
    // Or adjust the mapping here accordingly.
    return parsedData.map((item, index) => ({
      id: String(index + 1), // Simple ID based on row index
      title: item['Title'] || 'N/A',
      description: item['Description'] || 'N/A',
      originalPrice: item['Original Price'] || '0',
      salePrice: item['Sale Price'] || '0',
      discount: item['Discount'] || '',
      imageUrl: item['Image URL'] || '/placeholder.svg?height=300&width=300', // Default placeholder
      merchant: item['Merchant'] || 'N/A',
      category: item['Category'] || 'N/A',
      productLink: item['Product Link'] || '#',
      dateAdded: item['Date Added'] || '',
      availability: item['Availability'] || '',
      rating: item['Rating'] || '',
      reviews: item['Reviews'] || '',
    }));

  } catch (error) {
    console.error("Error fetching products from Google Sheet:", error);
    return []; // Return empty array on error or throw to be caught by page
  }
} 