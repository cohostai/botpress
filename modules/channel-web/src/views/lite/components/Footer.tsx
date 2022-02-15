import React from 'react'
import { FormattedMessage } from 'react-intl'

const Footer = () => {
  return (
    <span>
      <div className={'bpw-powered'}>
        <span>
          <FormattedMessage
            id="footer.poweredBy"
            defaultMessage="Built with {icon} by {link}"
            values={{
              icon: (
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="13px" height="13px" viewBox="0 0 13 13" version="1.1">
                    <g id="surface1">
                      <path stroke="none" fillRule="nonzero" fill="rgb(92.156863%,29.411765%,34.117647%)" fillOpacity="1" d="M 11.957031 1.1875 C 10.566406 -0.378906 8.3125 -0.378906 6.925781 1.1875 L 6.5 1.664062 L 6.078125 1.1875 C 4.6875 -0.378906 2.433594 -0.378906 1.042969 1.1875 C -0.347656 2.75 -0.347656 5.285156 1.042969 6.847656 L 1.46875 7.324219 L 6.5 12.988281 L 11.535156 7.324219 L 11.957031 6.847656 C 13.347656 5.285156 13.347656 2.75 11.957031 1.1875 Z M 11.957031 1.1875 "></path>
                    </g>
                  </svg>
                </i>
              ),
              link: (
                <a href={'https://www.cohost.vn/'} target="_blank">
                  {'Cohost AI'}
                </a>
              )
            }}
          />
        </span>
      </div>
    </span>
  )
}

export default Footer
