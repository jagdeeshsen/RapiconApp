import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProductService } from "../Service/ProductService";
import ProductCard from "../Components/ProductCard";
import ErrorMessage from "../Components/ErrorMessage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

const Products=()=> {

    const [allProducts, setAllProducts]= useState([]);
    const [loading, setLoading]= useState(true);
    const[totalProducts, setTotalProducts]= useState(0);

    const[showSortModal, setShowSortModal] = useState(false);
    const[showFilterModal, setShowFilterModal] = useState(false);

    const[sortOption, setSortOption] = useState('');
    const [filters, setFilters] = useState({
        category: "",
        plotSize: "",
        priceRange: "",
    });

    const [tempFilters, setTempFilters] = useState({
        category: "",
        plotSize: "",
        priceRange: "",
    });

    const categories = [
    "House",
    "Villa",
    "Apartment",
    "Bungalow",
    "Duplex",
    "Commercial",
    "Semi-Commercial"
    ];

    const plotSizes = [
    "600",
    "1000",
    "1500",
    "2000",
    ];

    const priceRanges = [
    "5000",
    "10000",
    "15000",
    "20000",
    ];

    useFocusEffect(
        useCallback(() => {
        fetchAllProducts();
        }, [])
    );

    const fetchAllProducts = async ()=>{
        setLoading(true);
        try{
            const products= await ProductService.getAllDesigns();
            setAllProducts(products);
            setTotalProducts(products.length);
        }catch(e){
            console.log(e.getMessage);
        }finally{
            setLoading(false);
        }
    };

    const finalProducts = useMemo(() => {
        let filtered = [...allProducts];

        // FILTERS

        if (filters.category) {
            filtered = filtered.filter(
            item => item.designType === 'Residential' ? item.designCategory === filters.category : item.designType === filters.category
            );
        }

        if (filters.plotSize) {
            filtered = filtered.filter(
            item => item.length * item.width <= parseInt(filters.plotSize)
            );
        }

        if (filters.priceRange) {
            filtered = filtered.filter(
            item => (item.builtUpArea * 5) <= parseInt(filters.priceRange)
            );
        }

        // SORTING

        switch (sortOption) {
            case "lowToHigh":
            filtered.sort((a, b) => a.builtUpArea*5 - b.builtUpArea*5);
            break;

            case "highToLow":
            filtered.sort((a, b) => b.builtUpArea*5 - a.builtUpArea*5);
            break;

            case "Newest":
            filtered.sort((a, b) =>
                new Date(b.createdAt)- new Date(a.createdAt)
            );
            break;

            case "Oldest":
            filtered.sort((a, b) =>
                new Date(a.createdAt)- new Date(b.createdAt)
            );
            break;
        }

        return filtered;
        }, [sortOption, filters]
    );


    return (
        <SafeAreaView edges={[]} style={styles.wrapper}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.filterWrapper}>
                <Text style={styles.resultText}>Over {totalProducts} results</Text>
                <Text style={styles.divider}>|</Text>
                <TouchableOpacity
                    style={styles.sortButton}
                    onPress={() => setShowSortModal(true)}
                    >
                    <Text style={styles.sortText}>Sort By</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sortButton}
                    onPress={() => {setTempFilters(filters); setShowFilterModal(true)}}
                    >
                    <Text style={styles.sortText}>Filters</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={finalProducts?.length > 0 ? finalProducts : allProducts}
                renderItem={({ item })=>( <ProductCard item={item}/>)}
                keyExtractor={(item)=> item.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                contentContainerStyle={{ padding: 8}}
                ListEmptyComponent={ loading ? <ActivityIndicator size="large" style={styles.activityIndicator}/> : <ErrorMessage textMessage= 'No product found. Please try again'/>}
            />

            <Modal
                visible={showSortModal}
                transparent
                animationType="slide"
                >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setShowSortModal(false)}
                >
                    <View style={styles.modalContainer}>

                    <Text style={styles.heading}>Sort By</Text>

                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                        setSortOption("lowToHigh");
                        setShowSortModal(false);
                        }}
                    >
                        <Text>Price Low to High</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                        setSortOption("highToLow");
                        setShowSortModal(false);
                        }}
                    >
                        <Text>Price High to Low</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                        setSortOption("Newest");
                        setShowSortModal(false);
                        }}
                    >
                        <Text>Newest</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                        setSortOption("Oldest");
                        setShowSortModal(false);
                        }}
                    >
                        <Text>Oldest</Text>
                    </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </Modal>

            <Modal
                visible={showFilterModal}
                transparent
                animationType="slide"
                >
                <View style={styles.overlay}>

                    <View style={styles.modalContainer}>

                        <Text style={styles.heading}>
                            Filters
                        </Text>

                        {/* CATEGORY */}

                        <Text style={styles.sectionTitle}>
                            Category
                        </Text>

                        <View style={styles.chipContainer}>
                            {categories.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                styles.chip,
                                tempFilters.category === item &&
                                    styles.selectedChip,
                                ]}
                                onPress={() =>
                                setTempFilters
                                    (prev => ({...prev, category: item}))           
                                }
                            >
                                <Text
                                style={[
                                    styles.chipText,
                                    tempFilters.category === item &&
                                    styles.selectedChipText,
                                ]}
                                >
                                {item}
                                </Text>
                            </TouchableOpacity>
                            ))}
                        </View>

                        {/* PLOT SIZE */}

                        <Text style={styles.sectionTitle}>
                            Plot Size
                        </Text>

                        <View style={styles.chipContainer}>
                            {plotSizes.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                styles.chip,
                                tempFilters.plotSize === item &&
                                    styles.selectedChip,
                                ]}
                                onPress={() =>
                                setTempFilters
                                    (prev => ({...prev, plotSize: item}))           
                                }
                            >
                                <Text
                                style={[
                                    styles.chipText,
                                    tempFilters.plotSize === item &&
                                    styles.selectedChipText,
                                ]}
                                >
                                {item} sqft
                                </Text>
                            </TouchableOpacity>
                            ))}
                        </View>

                        {/* PRICE RANGE */}

                        <Text style={styles.sectionTitle}>
                            Price Range
                        </Text>

                        <View style={styles.chipContainer}>
                            {priceRanges.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                styles.chip,
                                tempFilters.priceRange === item &&
                                    styles.selectedChip,
                                ]}
                                onPress={() =>
                                setTempFilters
                                    (prev => ({...prev, priceRange: item}))             
                                }
                            >
                                <Text
                                style={[
                                    styles.chipText,
                                    tempFilters.priceRange === item &&
                                    styles.selectedChipText,
                                ]}
                                >
                                ₹ {item}
                                </Text>
                            </TouchableOpacity>
                            ))}
                        </View>

                        {/* BUTTONS */}

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity
                                style={styles.applyButton}
                                onPress={() =>{
                                    setFilters(tempFilters);
                                    setShowFilterModal(false)
                                }}
                            >
                                <Text style={styles.buttonText}>
                                Apply Filters
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.clearButton}
                                onPress={() => {
                                setTempFilters({
                                    category: "",
                                    plotSize: "",
                                    priceRange: "",
                                });
                                setFilters({
                                    category: "",
                                    plotSize: "",
                                    priceRange: "",
                                });
                                setShowFilterModal(false);
                                }}
                            >
                                <Text style={styles.buttonText}>
                                Clear Filters
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles=StyleSheet.create({
    wrapper:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FB',
    },

    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    filterWrapper:{
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        padding: 5,
    },

    //========================= Sort Modal Styles =========================
    sortButton: {
        backgroundColor: '#FFFFFF',
        padding: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },

    sortText: {
        color: "#1A3A5C",
        fontWeight: "500",
    },

    divider:{
        color: '#1A3A5C',
        fontSize: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    resultText: {
        color: '#1A2233',
        fontWeight: '400',
        alignSelf: 'center',
    },

    card: {
        padding: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        marginBottom: 10,
    },

    productName: {
        fontSize: 16,
        fontWeight: "600",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "flex-end",
    },

    modalContainer: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },

    option: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
        marginTop: 10,
    },

    chipContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    chip: {
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 30,
        marginRight: 10,
        marginBottom: 10,
    },

    selectedChip: {
        backgroundColor: "#000",
        borderColor: "#000",
    },

    chipText: {
        color: "#000",
    },

    selectedChipText: {
        color: "#fff",
    },

    applyButton: {
        backgroundColor: "#000",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    clearButton: {
        backgroundColor: "red",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
});
export default Products;