import React from "react";
import PropTypes from "prop-types";
import { Card } from "../ui/card";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 auth-gradient">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            FlashLearn
          </h1>
          <p className="text-sm text-muted-foreground">
            Your personal flashcard learning assistant
          </p>
        </div>
        <Card className="card-shadow card-transition hover:bg-gradient-to-b from-blue-300 to-white">
          <div className="p-6">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
              {children}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default AuthLayout;