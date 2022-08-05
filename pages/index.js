import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Container } from '@chakra-ui/react'
import RestaurantButton from '../components/RestaurantButton'

export default function Home() {
  return (
    <Container maxW="container.lg" bg="#FEFEFA">
      <RestaurantButton></RestaurantButton>
    </Container>
  )
}
