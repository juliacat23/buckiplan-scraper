import { Heading } from '@chakra-ui/react';
import DefaultLayout from '../layouts/DefaultLayout';
import LandingHero from '../components/LandingHero';

export default function Home() {
    return (
        <DefaultLayout>
            <LandingHero />
        </DefaultLayout>
    );
}
