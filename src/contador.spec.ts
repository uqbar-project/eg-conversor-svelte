import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import Conversor from './routes/+page.svelte'

describe('Conversor', () => {

  it('should start with 0 miles & kilometers', () => {
		render(Conversor)

		const miles = screen.getByTestId('millas') as HTMLInputElement
		expect(miles.value).to.equal('0')

		const kilometers = screen.getByTestId('kilometers')
		expect(+kilometers.innerHTML).to.equal(0)
	})

  it('should convert valid miles to kilometers to locale es', async () => {
		render(Conversor)

		const miles = screen.getByTestId('millas') as HTMLInputElement
    await userEvent.type(miles, '100')
		const kilometers = screen.getByTestId('kilometers')
		expect(kilometers.innerHTML).to.equal('160,934')
	})

  it('reset puts miles value back to zero', async () => {
		render(Conversor)

		const miles = screen.getByTestId('millas') as HTMLInputElement
    await userEvent.type(miles, '100')
    const user = userEvent.setup()
    
    await user.click(screen.getByTestId('reset'))

    expect(miles.value).to.equal('0')
		const kilometers = screen.getByTestId('kilometers')
		expect(kilometers.innerHTML).to.equal('0')
	})

})
