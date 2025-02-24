

export interface TranslationString {
    es: string;
    en: string;
    de: string;
  }
  
export interface Sculpture {
  sculpture_id: string;
  image: string;
  size: string;
  is_starred: boolean;
  title: TranslationString;
  description: TranslationString;
}


async function fetchSculptures(): Promise<Sculpture[]> {
    try {
        const response = await fetch('/api/sculptures');
        return response.json();
    } catch (error) {
        console.error('Error fetching sculptures:', error);
        return [];
    }
}

const sculptures: Sculpture[] = await fetchSculptures();

export default sculptures;