import React from 'react'
import Link from 'next/link';

export default function Btn({name ,className}) {
  return (
    <div className='py-5'>
        <Link
              href="/schedule-a-call"
              target="_blank"
              className="inline-block bg-zaza text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors "
            >
              <span className="flex items-center">
                <span className="mr-3">{name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20.174"
                  height="12.383"
                  viewBox="0 0 20.174 12.383"
                >
                  <g transform="translate(-1735.326 -211.883)">
                    <line
                      y2="19.674"
                      transform="translate(1735.326 218.061) rotate(-90)"
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                      strokeWidth="1"
                    />
                    <path
                      d="M1.061,126.938l4.867,4.867H7.872l4.865-4.865"
                      transform="translate(1623.194 224.974) rotate(-90)"
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                      strokeWidth="1"
                    />
                  </g>
                </svg>
              </span>
        </Link>
    </div>
  )
}
