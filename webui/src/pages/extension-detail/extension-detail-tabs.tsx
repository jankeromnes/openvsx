/********************************************************************************
 * Copyright (c) 2019 TypeFox and others
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

import * as React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { createRoute } from "../../utils";
import { ExtensionRaw } from "../../extension-registry-types";
import { ExtensionDetailRoutes } from "./extension-detail";

export class ExtensionDetailTabsComponent extends React.Component<ExtensionDetailTabs.Props> {

    protected handleChange = (event: React.ChangeEvent, newTab: string) => {
        this.props.history.push(this.createRoute(newTab));
    }

    protected createRoute(tab: string) {
        const params = this.props.match.params as ExtensionDetailTabs.Params;
        if (tab === ExtensionDetailRoutes.TAB_OVERVIEW) {
            return createRoute([ExtensionDetailRoutes.ROOT, params.namespace, params.name]);
        } else {
            return createRoute([ExtensionDetailRoutes.ROOT, params.namespace, params.name, tab]);
        }
    }

    render() {
        const params = this.props.match.params as ExtensionDetailTabs.Params;
        return <React.Fragment>
            <Tabs value={params.tab || ExtensionDetailRoutes.TAB_OVERVIEW} onChange={this.handleChange}>
                <Tab value={ExtensionDetailRoutes.TAB_OVERVIEW} label='Overview' />
                <Tab value={ExtensionDetailRoutes.TAB_REVIEWS} label='Rating &amp; Review' />
            </Tabs>
        </React.Fragment>;
    }
}

export namespace ExtensionDetailTabs {
    export interface Props extends RouteComponentProps {
    }

    export interface Params extends ExtensionRaw {
        tab?: string;
    }
}

export const ExtensionDetailTabs = withRouter(ExtensionDetailTabsComponent);
