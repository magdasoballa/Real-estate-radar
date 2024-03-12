import { useEffect, useState } from 'react';

const useListingsFilter = (initialData) => {
    const [sortBy, setSortBy] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedRooms, setSelectedRooms] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        setFilteredItems(initialData);
    }, [initialData]);

    const applyFilters = () => {
        let filteredListings = [...initialData];
        let hasNoResults = false;

        if (selectedCountry !== '') {
            filteredListings = filteredListings.filter(house => house.country === selectedCountry);
            hasNoResults = filteredListings.length === 0;
        }

        if (selectedRooms !== '') {
            filteredListings = filteredListings.filter(house => house.rooms === parseInt(selectedRooms));
            hasNoResults = filteredListings.length === 0;
        }

        setNoResults(hasNoResults);

        if (sortBy !== '') {
            filteredListings = sortedListings(filteredListings);
        }

        setFilteredItems(filteredListings);
    };


    const sortedListings = (listings) => {
        return listings.sort((a, b) => {
            switch (sortBy) {
                case 'dateAsc':
                    return new Date(a.dateOfIssue).getTime() - new Date(b.dateOfIssue).getTime();
                case 'dateDesc':
                    return new Date(b.dateOfIssue).getTime() - new Date(a.dateOfIssue).getTime();
                case 'priceAsc':
                    return a.price - b.price;
                case 'priceDesc':
                    return b.price - a.price;
                case 'titleAsc':
                    return a.title.localeCompare(b.title);
                case 'titleDesc':
                    return b.title.localeCompare(a.title);
                case 'roomsAsc':
                    return a.rooms - b.rooms;
                case 'roomsDesc':
                    return b.rooms - a.rooms;
                default:
                    return 0;
            }
        });
    };

    const resetFilters = () => {
        setShowAll(true);
        setSelectedCountry('');
        setSelectedRooms('');
        setSortBy('');
    };

    return {
        sortBy,
        setSortBy,
        selectedCountry,
        setSelectedCountry,
        selectedRooms,
        setSelectedRooms,
        showAll,
        setShowAll,
        filteredItems,
        setFilteredItems,
        noResults,
        setNoResults,
        applyFilters,
        resetFilters
    };
};

export default useListingsFilter;
