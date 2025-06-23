import "expo-router/entry";
import { PaperProvider } from 'react-native-paper';

export default function App() {
    return (
        <PaperProvider>
            <entry />
        </PaperProvider>
    )
} 