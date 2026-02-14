import React from 'react'

const Footer = () => {
    return (


        <footer className="flex items-center gap-8 pt-8 border-t border-cyan-500/20">
            <div className="font-mono text-xs">
                <span className="text-gray-600">ACTIVE_USERS:</span>
                <span className="text-cyan-400 ml-2">10,000+</span>
            </div>
            <div className="font-mono text-xs">
                <span className="text-gray-600">STATUS:</span>
                <span className="text-green-400 ml-2">ONLINE</span>
            </div>
            <div className="font-mono text-xs">
                <span className="text-gray-600">POWERED_BY:</span>
                <span className="text-pink-400 ml-2">JAVANSHIR</span>
            </div>
        </footer>

    )
}

export default Footer