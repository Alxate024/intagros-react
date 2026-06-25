import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header'
import { ContactProvider } from '../../context'

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <ContactProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ContactProvider>
    )
  }

  it('renders the header logo', () => {
    renderHeader()
    const logo = screen.getByAltText('INTAGROS')
    expect(logo).toBeInTheDocument()
  })

  it('renders WhatsApp link', () => {
    renderHeader()
    const whatsappLinks = screen.getAllByText('WhatsApp')
    expect(whatsappLinks.length).toBeGreaterThan(0)
    expect(whatsappLinks[0]).toHaveAttribute('href')
    expect(whatsappLinks[0]).toHaveAttribute('target', '_blank')
  })

  it('has menu button for mobile', () => {
    renderHeader()
    const menuButton = screen.getByRole('button', { name: /abrir menu/i })
    expect(menuButton).toBeInTheDocument()
  })
})

