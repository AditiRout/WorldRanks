import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import {useState} from 'react'
import styles from '../styles/Home.module.css'
import Layout from './../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import CountriesTable from '../components/CountriesTable.js/CountriesTable';

const inter = Inter({ subsets: ['latin'] })

export default function Home({countries}) {
  console.log(countries)
  const[keyword,setKeyword]=useState("")
  const filteredCountries=countries.filter(country=>country.name.toLowerCase().includes(keyword) || country.region.toLowerCase().includes(keyword)|| country.subregion.toLowerCase().includes(keyword));

  const onInputChange=(e)=>{
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  }
  return (
    <>
      <Layout>
        
        <div  className={styles.counts}>Found {countries.length} countries</div>
        <SearchInput placeholder="Filter by name,region or subregion" onChange={onInputChange}/>
        <CountriesTable countries={filteredCountries}/>
        </Layout>
    </>
  )
}

export const getStaticProps=async()=>{
  const res= await fetch("https://restcountries.com/v2/all")
  const countries=await res.json();

  return{
    props:{
      countries,
    }
  }
}