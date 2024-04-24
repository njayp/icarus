package main

import (
	"context"
	"fmt"
	"log"

	"github.com/cloudflare/cloudflare-go/v2"
	"github.com/cloudflare/cloudflare-go/v2/accounts"
	"github.com/cloudflare/cloudflare-go/v2/zero_trust"
	"github.com/cloudflare/cloudflare-go/v2/zones"
	"github.com/spf13/cobra"
)

func main() {
	rootCmd().Execute()
}

func rootCmd() *cobra.Command {
	cmd := &cobra.Command{}
	//flags := cmd.PersistentFlags()
	cmd.AddCommand(accountsCmd(), zonesCmd(), tunnelsCmd())
	return cmd
}

func accountsCmd() *cobra.Command {
	return &cobra.Command{
		Use: "accounts",
		Run: func(cmd *cobra.Command, args []string) {
			client := cloudflare.NewClient()
			page, err := client.Accounts.List(cmd.Context(), accounts.AccountListParams{})
			if err != nil {
				log.Fatal(err)
			}

			// bp code cause page type is internal
			for len(page.Result) != 0 {
				for _, account := range page.Result {
					fmt.Printf("%+v\n", account)
				}

				page, err = page.GetNextPage()
				if err != nil {
					log.Fatal(err)
				}
			}
		},
	}
}

func zonesCmd() *cobra.Command {
	return &cobra.Command{
		Use: "zones",
		Run: func(cmd *cobra.Command, args []string) {
			client := cloudflare.NewClient()
			page, err := client.Zones.List(context.Background(), zones.ZoneListParams{})
			if err != nil {
				log.Fatal(err)
			}
			zone := page.Result[0]
			bytes := make([]byte, 0)
			err = zone.UnmarshalJSON(bytes)
			if err != nil {
				log.Fatal(err)
			}
			fmt.Println(bytes)
		},
	}
}

func tunnelsCmd() *cobra.Command {
	return &cobra.Command{
		Use:  "create",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			client := cloudflare.NewClient()
			page, err := client.ZeroTrust.Tunnels.New(cmd.Context(), zero_trust.TunnelNewParams{Name: cloudflare.String(args[0])})
			if err != nil {
				log.Fatal(err)
			}

			println(page.Name)
		},
	}
}
