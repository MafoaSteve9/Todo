export async function chargerSuggestions() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    const commentaires = await response.json();

    const suggestions = commentaires.slice(0, 5).map(comment => ({
      text: comment.body,
      checked: false
    }));

    return suggestions;

  } catch (error) {
    console.error("Erreur lors du chargement des suggestions :", error);
    return [];
  }
}