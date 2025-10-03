// styles.js
// Shared design system for all frontend pages
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#E23744',
  secondary: '#F7F7F7',
  accent: '#FFB347',
  text: '#222',
  background: '#FFF',
  card: '#FFF',
  border: '#E0E0E0',
  shadow: 'rgba(0,0,0,0.08)',
};

export const fonts = {
  regular: 'System',
  bold: 'System',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    color: colors.text,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#E23744',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
});
