import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from 'axios';

const StudentMonthlyCalculator = () => {

  const [transactions, setTransactions] = useState([]);
  const [spentAmount, setSpentAmount] = useState(0);
  const [earnedAmount, setEarnedAmount] = useState(0);

  useEffect(() => {
    // Fetch transactions from the backend
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost/api/transactions');
        const fetchedTransactions = response.data;

        // Calculate spent and earned amounts
        const spent = fetchedTransactions
          .filter(transaction => transaction.type === 'expense')
          .reduce((total, transaction) => total + transaction.amount, 0);

        const earned = fetchedTransactions
          .filter(transaction => transaction.type === 'income')
          .reduce((total, transaction) => total + transaction.amount, 0);

        setSpentAmount(spent);
        setEarnedAmount(earned);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const addTransaction = async (type, amount) => {
    try {
      await axios.post('http://localhost/api/transactions', { type, amount });
      // Refresh transactions after adding a new one
      const response = await axios.get('http://localhost/api/transactions');
      const fetchedTransactions = response.data;

      // Calculate spent and earned amounts
      const spent = fetchedTransactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);

      const earned = fetchedTransactions
        .filter(transaction => transaction.type === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0);

      setSpentAmount(spent);
      setEarnedAmount(earned);
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Calculate remaining budget
  const remainingBudget = earnedAmount - spentAmount;

  // Pie chart data
  const data = [
    {
      name: 'Spent',
      amount: spentAmount,
      color: '#FF5733',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Remaining',
      amount: remainingBudget > 0 ? remainingBudget : 0,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View className="w-full h-full">
      <View className="w-full h-1/4 bg-[#614bc3]">
        <View className="w-full flex items-center justify-end h-[65%]">
          <Text className="text-[28px] text-white font-bold">Monthly Statement</Text>
        </View>
      </View>
      <View className="relative w-full h-3/4 bg-white">
        <View className="w-full h-[10%] border-b-[0.25px] border-gray-300 flex flex-row">
          <TouchableOpacity className="w-1/2 h-full flex flex-row items-center justify-center">
            <Text className="text-[25px] font-bold mr-1">2023</Text>
            <Ionicons name='chevron-down' size={25}/>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-full flex flex-row items-center justify-center">
            <Text className="text-[25px] font-light mr-1">November</Text>
            <Ionicons name='chevron-down' size={25}/>
          </TouchableOpacity>
        </View>
        <View className="w-full h-[12%] flex flex-row">
          <View className="w-1/2 h-full border-r-[0.25px] border-gray-300 flex items-center justify-center">
            <Text className="text-[25px] font-thin">Spent</Text>
            <Text className="text-[20px] font-bold">{`RM ${spentAmount}`}</Text>
          </View>
          <View className="w-1/2 h-full flex items-center justify-center">
            <Text className="text-[25px] font-thin">Earned</Text>
            <Text className="text-[20px] font-bold">{`RM ${earnedAmount}`}</Text>
          </View>
        </View>
        <View className="w-full h-[7%] flex items-center justify-center">
          <Text className="font-bold text-[20px]">Breakdown</Text>
        </View>
        <View className="absolute w-full h-[25%] bottom-12 flex items-center justify-center">
          {/* Pie chart */}
          <PieChart
            data={data}
            width={Dimensions.get('window').width}
            height={200}
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>
        <View className="absolute w-full h-[13%] bottom-12 flex items-center justify-center">
          <TouchableOpacity className="w-[55%] h-[70%] rounded-2xl flex items-center justify-center shadow border-[0.25px] border-[#614bc3] bg-[#614bc3]" onPress={() => addTransaction('expense', 50)}>
            <Text className="font-bold uppercase text-white text-[16px]">Add Transaction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>  )
}

export default StudentMonthlyCalculator;