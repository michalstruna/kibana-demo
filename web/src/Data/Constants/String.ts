import Language from './Language'
import Url from '../../Routing/Constants/Url'
import { Validator } from '../../Native'
import { Query } from '../../Routing'

const CS = Language.CS
const EN = Language.EN

export default {

    generator: {
        count: { [CS]: 'Počet' },
        missingCount: { [CS]: 'Zadejte počet' },
        generate: { [CS]: 'Generovat' },
        title: { [CS]: 'Generátor naměřených dat' },
        error: { [CS]: 'Někde nastala chyba' }
    },

    device: {
        newDevice: { [CS]: 'Nové zařízení' },
        name: { [CS]: 'Název' },
        missingName: { [CS]: 'Zadejte název' },
        addSubmit: { [CS]: 'Přidat' },
        latitude: { [CS]: 'Zeměpisná šířka' },
        missingLatitude: { [CS]: 'Zadejte zem. šířku' },
        longitude: { [CS]: 'Zeměpisná délka' },
        missingLongitude: { [CS]: 'Zadejte zem. délku' },
        altitude: { [CS]: 'Nadmořská výška' },
        missingAltitude: { [CS]: 'Zadejte nadm. výšku' },
        addError: { [CS]: 'Přidání se nepodařilo' }
    },

    sensor: {
        newSensor: { [CS]: 'Nový senzor' },
        name: { [CS]: 'Name' },
        missingName: { [CS]: 'Zadejte název' },
        addSubmit: { [CS]: 'Přidat' },
        type: { [CS]: 'Typ' },
        addError: { [CS]: 'Přidání se nepodařilo' },
        types: {
            THERMOMETER: { [CS]: 'Teploměr' },
            HYGROMETER: { [CS]: 'Hygrometr' },
            ANEMOMETER: { [CS]: 'Anemometr' },
            BAROMETER: { [CS]: 'Barometer' }
        }
    },

    nav: {
        links: [
            { text: { [CS]: 'Přehled' }, pathname: Url.HOME, query: { [Query.SORT_COLUMN]: null }, icon: 'Overview' },
        ],
        authLinks: [
            { text: { [CS]: 'Zařízení' }, pathname: Url.DEVICES, icon: 'Database' },
        ],
        adminLinks: [
            { text: { [CS]: 'Generátor' }, pathname: Url.GENERATOR, icon: 'Generator' }
        ]
    },

    home: {
        title: { [CS]: 'Nadpis', [EN]: 'Title' },
        toggle: { [CS]: 'Změnit jazyk', [EN]: 'Change language' },
        help: { [CS]: 'Nápověda', [EN]: 'Help' }
    },

    help: {
        home: { [CS]: 'Domů', [EN]: 'Home' }
    },

    filter: {
        relations: {
            [Validator.Relation.CONTAINS]: { [CS]: 'Obsahuje', [EN]: 'Contains' },
            [Validator.Relation.EQUALS]: { [CS]: 'Rovná se', [EN]: 'Equals' },
            [Validator.Relation.ENDS_WITH]: { [CS]: 'Končí na', [EN]: 'Ends with' },
            [Validator.Relation.STARTS_WITH]: { [CS]: 'Začíná na', [EN]: 'Starts with' },
            [Validator.Relation.LESS_THAN]: { [CS]: 'Je menší než', [EN]: 'Is less than' },
            [Validator.Relation.GREATER_THAN]: { [CS]: 'Je větší než', [EN]: 'Is more than' }
        },
        value: { [CS]: 'Hodnota filtru...', [EN]: 'Filter value...' }
    },

    properties: {
        // General
        type: { [CS]: 'Typ', [EN]: 'Type' },
        name: { [CS]: 'Název', [EN]: 'Name' },

        // Datasets
        totalSize: { [CS]: 'Objektů', [EN]: 'Objects' },
        processed: { [CS]: 'Zpracováno', [EN]: 'Processed' },
        date: { [CS]: 'Datum', [EN]: 'Date' },
        published: { [CS]: 'Zveřejněno', [EN]: 'Published' },
        url: 'URL',
        time: { [CS]: 'Výpočetní čas', [EN]: 'Process time' },
        modified: { [CS]: 'Posl. aktivita', [EN]: 'Last activity' },
        priority: { [CS]: 'Priorita', [EN]: 'Priority' },

        // Stars
        spectral_class: { [CS]: 'Spektrální třída', [EN]: 'Spectral class' },
        luminosity_class: { [CS]: 'Třída svítivosti', [EN]: 'Luminosity class' },
        diameter: { [CS]: 'Průměr', [EN]: 'Diameter' },
        mass: { [CS]: 'Hmotnost', [EN]: 'Mass' },
        distance: { [CS]: 'Vzdálenost', [EN]: 'Distance' },
        surfaceTemperature: { [CS]: 'Teplota', [EN]: 'Temperature' },
        spectralClass: { [CS]: 'Spektr. třída', [EN]: 'Spectr. class' },
        density: { [CS]: 'Hustota', [EN]: 'Density' },
        luminosity: { [CS]: 'Zář. výkon', [EN]: 'Luminosity' },
        surfaceGravity: { [CS]: 'Gravitace', [EN]: 'Gravity' },
        planets: { [CS]: 'Planet', [EN]: 'Planets' },
        dataset: { [CS]: 'Datasety', [EN]: 'Datasets' },
        lightCurve: { [CS]: 'Světelná křivka', [EN]: 'Light curve' },
        absoluteMagnitude: 'Abs. mag.',
        apparentMagnitude: { [CS]: 'Zdánl. mag.', [EN]: 'Apparent mag.' },
        metallicity: { [CS]: 'Metalicita', [EN]: 'Metallicity' },
        ra: { [CS]: 'Rektascenze', [EN]: 'Right ascension' },
        dec: { [CS]: 'Deklinace', [EN]: 'Declination' },

        // Planets
        semiMajorAxis: { [CS]: 'Velká poloosa', [EN]: 'Semi-major axis' },
        transit: { [CS]: 'Tranzit', [EN]: 'Transit' },
        orbitalPeriod: { [CS]: 'Perioda', [EN]: 'Period' },
        orbitalVelocity: { [CS]: 'Rychlost', [EN]: 'Velocity' },
        lifeConditions: { [CS]: 'Život', [EN]: 'Life' },
        planet: { [CS]: 'Planeta', [EN]: 'Planet' },
        status: 'Status',
        eccentricity: { [CS]: 'Excentricita', [EN]: 'Eccentricity' }
    },

    units: {
        time: {
            second: 's', minute: 'm', hour: 'h', day: 'd', year: { [CS]: 'r', [EN]: 'y' }, millisecond: 'ms'
        }
    },

    database: {
        select: { [CS]: 'Tabulka', [EN]: 'Table' },
        tables: {
            bodies: { [CS]: 'Tělesa', [EN]: 'Bodies' },
            stars: { [CS]: 'Hvězdy', [EN]: 'Stars' },
            planets: { [CS]: 'Planety', [EN]: 'Planets' },
            datasets: { [CS]: 'Datasety', [EN]: 'Datasety' },
            users: { [CS]: 'Uživatelé', [EN]: 'Users' }
        }
    },

    system: {
        content: { [CS]: 'Obsah', [EN]: 'Content' },
        observations: { [CS]: 'Pozorování', [EN]: 'Observations' },
        lightCurve: { [CS]: 'Světelná křivka', [EN]: 'Light curve' },
        radialVelocity: { [CS]: 'Radiální rychlost', [EN]: 'Radial velocity' },
        planets: { [CS]: 'Planety', [EN]: 'Planets' },
        visualization: { [CS]: 'Vizualizace', [EN]: 'Visualization' },
        sizes: { [CS]: 'Velikosti', [EN]: 'Sizes' },
        distances: { [CS]: 'Vzdálenosti', [EN]: 'Distances' },
        model: { [CS]: 'Interaktivní model', [EN]: 'Interactive model' },
        references: { [CS]: 'Reference', [EN]: 'References' },
        activities: { [CS]: 'Aktivity', [EN]: 'Activities' },
        matter: { [CS]: 'Hmota', [EN]: 'Matter' },
        orbit: { [CS]: 'Dráha', [EN]: 'Orbit' },
        other: { [CS]: 'Ostatní', [EN]: 'Other' },
        localView: { [CS]: 'Lokální pohled', [EN]: 'Local view' },
        globalView: { [CS]: 'Globální pohled', [EN]: 'Global view' }
    },

    stats: {
        units: {
            hours: 'h',
            gibs: 'GiB'
        },
        planets: {
            [CS]: 'Objevených planet',
            [EN]: 'Discovered planets'
        },
        stars: {
            [CS]: 'Zpracováno hvězd',
            [EN]: 'Explored Stars'
        },
        hours: {
            [CS]: 'Výpočetní čas',
            [EN]: 'Computing time'
        },
        volunteers: {
            [CS]: 'Dobrovolníků',
            [EN]: 'Volunteers'
        },
        gibs: {
            [CS]: 'Zpracováno dat',
            [EN]: 'Processed data'
        },
        curves: {
            [CS]: 'Zpracovano křivek',
            [EN]: 'Processed curves'
        },
        lastWeek: { [CS]: 'poslední týden', [EN]: 'Last week' }
    },

    auth: {
        email: 'Email',
        password: { [CS]: 'Heslo', [EN]: 'Password' },
        passwordAgain: { [CS]: 'Heslo pro kontrolu' },
        passwordsNotEqual: { [CS]: 'Hesla se nerovnají' },
        forgotPassword: { [CS]: 'Zapomenuté heslo?', [EN]: 'Forgot password?' },
        error: { [CS]: 'Špatné přihlašovací údaje.', [EN]: 'Bad credentials' },
        signUpError: { [CS]: 'Nevalidní údaje.' },
        missingEmail: { [CS]: 'Napište svůj email', [EN]: 'Type your email' },
        invalidEmail: { [CS]: 'Napište validní email.', [EN]: 'Type valid email.' },
        missingPassword: { [CS]: 'Napište své heslo', [EN]: 'Type your password' },
        or: { [CS]: 'Nebo', [EN]: 'Or' },
        name: { [CS]: 'Jméno', [EN]: 'Name' },
        login: { [CS]: 'Přihlásit se', [EN]: 'Login' },
        signUp: { [CS]: 'Zaregistrovat se', [EN]: 'Sign up' },
        resetPassword: { [CS]: 'Resetovat heslo', [EN]: 'Reset password' },
        signUpToLogin: { [CS]: 'Již máte účet?', [EN]: 'Already have account?' },
        roles: ['Nepřihlášený', 'Přihlášený', 'Administrátor'],
        invalidToken: { [CS]: 'Neplatný odkaz' }
    }

}