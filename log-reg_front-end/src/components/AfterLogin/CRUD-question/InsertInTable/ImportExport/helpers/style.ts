import { StyleSheet } from '@react-pdf/renderer';

export const mainPageStyle = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#203A43', // Ciemne tło
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#F2F3F4', // Jasny kolor dla kontrastu
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#CAD2C5', // Pastelowy zielony
    fontStyle: 'italic',
    marginBottom: 30, 
  },
  description: {
    fontSize: 14,
    color: '#F2F3F4', // Biały kolor dla kontrastu
    textAlign: 'justify', // Justowanie tekstu
    marginHorizontal: 40, // Zwiększone marginesy poziome
    marginBottom: 30,
    paddingHorizontal: 20, // Dodatkowe paddingi poziome dla lepszego wyświetlania tekstu
  },
});



export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF8E8', // Jasne, ciepłe tło
    padding: 20,
    borderColor: '#FF6B6B', // Żywy czerwony obramowanie
    borderWidth: 2,
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottomColor: '#4ECDC4', // Turkusowy kolor linii
    borderBottomWidth: 1,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A535C', // Ciemny turkus
  },
  answer: {
    fontSize: 14,
    paddingLeft: 20,
    color: '#FF6B6B', // Żywy czerwony
  },
  correctAnswer: {
    fontSize: 14,
    color: '#6BFF6B', // Jasnozielony
    fontWeight: 'bold',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 14,
    color: '#FF6B6B', // Żywy czerwony
    backgroundColor: '#F7FFF7', // Jasnozielone tło
    padding: '4 8',
    borderRadius: 5,
  },
  spacer: {
    height: 15,
  },
  title: {
    fontSize: 20,
    color: '#FF6B6B', // Żywy czerwony
    textAlign: 'center',
    marginBottom: 10,
  },
});
