import { Button } from "../../components/common";
import { DeskproAppTheme, useDeskproAppClient, useDeskproAppEvents } from "@deskpro/app-sdk";
import { getCurrentAccountService } from "../../services/simple-mdm";
import { nbsp } from "../../constants";
import { P1, Stack, TSpan } from "@deskpro/deskpro-ui";
import { useMemo, useState, useCallback } from "react";
import get from "lodash/get";
import styled from "styled-components";
import type { Account } from "../../services/simple-mdm/types";
import type { FC } from "react";
import type { Maybe, Settings } from "../../types";

const Invalid = styled(TSpan) <DeskproAppTheme>`
  color: ${({ theme }) => theme.colors.red100};
`;

const Valid = styled.span<DeskproAppTheme>`
  color: ${({ theme }) => theme.colors.grey100};
`;

const VerifySettings: FC = () => {
  const { client } = useDeskproAppClient();
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
  const [settings, setSettings] = useState<Maybe<Settings>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const API_KEY = useMemo(() => get(settings, ["api_key"]), [settings]);
  const errorMessage = useMemo(() => "Failed to connect to SimpleMDM, settings seem to be invalid", []);

  const onVerifySettings = useCallback(() => {
    if (!client || !API_KEY) {
      return;
    }

    setIsLoading(true);
    setError("");
    setCurrentAccount(null);

    return getCurrentAccountService(client, { api_key: API_KEY })
      .then(({ data }) => setCurrentAccount(data))
      .catch((err) => {
        setError(get(err, ["data", "errors", 0, "title"]) || errorMessage);
      })
      .finally(() => setIsLoading(false));
  }, [client, API_KEY, errorMessage]);

  useDeskproAppEvents({
    onAdminSettingsChange: setSettings,
  }, [client]);

  return (
    <Stack align="baseline">
      <Button
        text="Verify Settings"
        intent="secondary"
        onClick={onVerifySettings}
        loading={isLoading}
        disabled={!API_KEY || isLoading}
      />
      {nbsp}
      {currentAccount
        ? (
          <P1>
            Verified as <Valid>{get(currentAccount, ["attributes", "name"], "")}</Valid>
          </P1>
        )
        : <Invalid type="p1">{error}</Invalid>
      }
    </Stack>
  );
};

export { VerifySettings };
