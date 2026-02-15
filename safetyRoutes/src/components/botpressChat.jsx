import React, { useEffect } from 'react';

const BotpressChat = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;

    // When inject.js finishes loading, then load your chat config
    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.src = "https://files.bpcontent.cloud/2025/02/07/14/20250207140224-0DWX8AF1.js";
      script2.async = true;
      document.body.appendChild(script2);
    };

    document.body.appendChild(script1);

    // Cleanup
    return () => {
      document.body.removeChild(script1);
      const existing2 = document.querySelector(`script[src="${"https://files.bpcontent.cloud/2025/02/07/14/20250207140224-0DWX8AF1.js"}"]`);
      if (existing2) document.body.removeChild(existing2);
    };
  }, []);

  return null;
};

export default BotpressChat;
